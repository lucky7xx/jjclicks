import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/mongodb';
import JJPortfolioImage from '@/models/JJPortfolio';
import { uploadToCloudinary, deleteFromCloudinary } from '@/lib/cloudinary';

// GET - Fetch all JJ Clicks portfolio images or by category
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    const landingOnly = searchParams.get('landingOnly');

    let query: any = {};

    if (category) {
      query.category = category;
    }

    if (landingOnly === 'true') {
      query.isLandingPage = true;
    }

    const images = await JJPortfolioImage.find(query).sort({ order: 1, uploadedAt: -1 });

    return NextResponse.json({ success: true, data: images });
  } catch (error) {
    console.error('Error fetching JJ portfolio images:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch images' },
      { status: 500 }
    );
  }
}

// POST - Upload new image to JJ Clicks portfolio
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession();

    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const category = formData.get('category') as string;
    const isLandingPage = formData.get('isLandingPage') === 'true';

    if (!file || !category) {
      return NextResponse.json(
        { success: false, error: 'File and category are required' },
        { status: 400 }
      );
    }

    // Check if category already has 20 images
    const count = await JJPortfolioImage.countDocuments({ category });
    if (count >= 20) {
      return NextResponse.json(
        { success: false, error: 'Maximum 20 images allowed per category' },
        { status: 400 }
      );
    }

    // Convert file to base64 for Cloudinary
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = `data:${file.type};base64,${buffer.toString('base64')}`;

    // Upload to Cloudinary with JJ Clicks folder
    const { url, publicId } = await uploadToCloudinary(base64, `jjclicks/${category}`);

    // If isLandingPage is true, unset other landing page images for this category
    if (isLandingPage) {
      await JJPortfolioImage.updateMany({ category }, { isLandingPage: false });
    }

    // Get the next order number
    const maxOrder = await JJPortfolioImage.findOne({ category }).sort({ order: -1 });
    const order = maxOrder ? maxOrder.order + 1 : 0;

    // Create database entry
    const portfolioImage = await JJPortfolioImage.create({
      url,
      publicId,
      category,
      isLandingPage,
      order,
    });

    return NextResponse.json({ success: true, data: portfolioImage }, { status: 201 });
  } catch (error) {
    console.error('Error uploading JJ image:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to upload image' },
      { status: 500 }
    );
  }
}

// DELETE - Delete image from JJ Clicks portfolio
export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession();

    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'Image ID required' }, { status: 400 });
    }

    const image = await JJPortfolioImage.findById(id);

    if (!image) {
      return NextResponse.json({ success: false, error: 'Image not found' }, { status: 404 });
    }

    // Delete from Cloudinary
    await deleteFromCloudinary(image.publicId);

    // Delete from database
    await JJPortfolioImage.findByIdAndDelete(id);

    return NextResponse.json({ success: true, message: 'Image deleted successfully' });
  } catch (error) {
    console.error('Error deleting JJ image:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete image' },
      { status: 500 }
    );
  }
}

// PATCH - Update JJ Clicks image (toggle landing page or reorder)
export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession();

    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const body = await request.json();
    const { id, isLandingPage, order } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: 'Image ID required' }, { status: 400 });
    }

    const image = await JJPortfolioImage.findById(id);

    if (!image) {
      return NextResponse.json({ success: false, error: 'Image not found' }, { status: 404 });
    }

    // If setting as landing page, unset others in the same category
    if (isLandingPage !== undefined && isLandingPage === true) {
      await JJPortfolioImage.updateMany({ category: image.category }, { isLandingPage: false });
    }

    // Update the image
    const updateData: any = {};
    if (isLandingPage !== undefined) updateData.isLandingPage = isLandingPage;
    if (order !== undefined) updateData.order = order;

    const updatedImage = await JJPortfolioImage.findByIdAndUpdate(id, updateData, { new: true });

    return NextResponse.json({ success: true, data: updatedImage });
  } catch (error) {
    console.error('Error updating JJ image:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update image' },
      { status: 500 }
    );
  }
}
