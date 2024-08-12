import axios from 'axios';
import { NextResponse } from 'next/server';

const API_TOKEN = process.env.API_TOKEN;

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const group_id = searchParams.get('group_id');

  try {
    const result = await axios({
      method: 'get',
      url: `https://todo-api.rakamin.com/todos/${group_id}/items`,
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });
    return NextResponse.json(result.data);
  } catch (err) {
    console.error(err);
    return NextResponse.error();
  }
}

export async function POST(req) {
  const { searchParams } = new URL(req.url);
  const body = await req.json();

  const group_id = searchParams.get('group_id');
  const { name, progress_percentage } = body;

  try {
    const result = await axios({
      method: 'post',
      url: `https://todo-api.rakamin.com/todos/${group_id}/items`,
      data: {
        name: name,
        progress_percentage: parseInt(progress_percentage),
      },
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });
    return NextResponse.json(result.data);
  } catch (err) {
    console.error(err);
    return NextResponse.error();
  }
}

export async function PATCH(req) {
  const { searchParams } = new URL(req.url);
  const group_id = searchParams.get('group_id');
  const item_id = searchParams.get('item_id');
  const body = await req.json();
  const { target_todo_id, name, progress_percentage } = body;
  const updateData = {};

  updateData.target_todo_id = target_todo_id ?? group_id;

  if (name !== undefined) {
    updateData.name = name;
  }

  if (progress_percentage !== undefined) {
    updateData.progress_percentage = parseFloat(progress_percentage);
  }

  try {
    const result = await axios({
      method: 'patch',
      url: `https://todo-api.rakamin.com/todos/${group_id}/items/${item_id}`,
      data: updateData,
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });
    return NextResponse.json(result.data);
  } catch (err) {
    console.error(err);
    return NextResponse.error();
  }
}

export async function DELETE(req) {
  const { searchParams } = new URL(req.url);

  const group_id = searchParams.get('group_id');
  const item_id = searchParams.get('item_id');

  try {
    await axios({
      method: 'delete',
      url: `https://todo-api.rakamin.com/todos/${group_id}/items/${item_id}`,
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });

    return NextResponse.json({ message: 'Item Deleted' });
  } catch (error) {
    console.error('Error deleting item:', error);
    return NextResponse.json(
      { error: 'Failed to delete item' },
      { status: 500 },
    );
  }
}
