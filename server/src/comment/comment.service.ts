import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment, CommentDocument } from './entities/comment.entity';
import { User } from 'src/user/entities/user.entity';
import { Model } from 'mongoose';
import { CardService } from 'src/card/card.service';
import { InjectModel } from '@nestjs/mongoose';
import { CustomException } from 'src/error';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    private readonly cardService: CardService,
  ) {}
  async create(createCommentDto: CreateCommentDto, user: User) {
    const comment = new this.commentModel({
      content: createCommentDto.content,
      author: user._id,
    });
    await comment.save();
    await this.cardService.addComment(createCommentDto.cardId, comment.id);
    return 'This action adds a new comment';
  }
  async delete(id: string, user: User) {
    const commentDeleted = await this.commentModel.findOneAndDelete({
      _id: id,
      author: user._id,
    });
    if (!commentDeleted) throw new CustomException('something went wrong');
    return commentDeleted;
  }

  findAll() {
    return `This action returns all comment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} comment`;
  }

  update(id: number, updateCommentDto: UpdateCommentDto) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
