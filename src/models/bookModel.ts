import mongoose from "mongoose";

interface IBook {
  title: string;
  author: string;
  summary: string;
}

const bookSchema = new mongoose.Schema<IBook>({
  title: { type: String, unique: true, required: true },
  author: { type: String, required: true },
  summary: { type: String, required: true },
}, {timestamps:true});

const bookModel = mongoose.model<IBook>("book", bookSchema);
export default bookModel;
