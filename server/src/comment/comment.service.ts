import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment, CommentDocument } from './entities/comment.entity';
import { User } from 'src/user/entities/user.entity';
import { Model } from 'mongoose';
import { CardService } from 'src/card/card.service';
import { InjectModel } from '@nestjs/mongoose';
import { CustomException } from 'src/error';
import { CommentsGateway } from './comment.gateway';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    private readonly cardService: CardService,
    private commentsGateway: CommentsGateway,
  ) {}
  async create(createCommentDto: CreateCommentDto, user: User) {
    const comment = new this.commentModel({
      content: createCommentDto.content,
      author: user._id,
    });
    await comment.save();
    const newComment = await this.commentModel
      .findById(comment.id)
      .populate('author');
    if (!newComment) return;
    await this.cardService.addComment(createCommentDto.cardId, comment.id);
    await this.commentsGateway.handleNewComment(
      newComment,
      createCommentDto.cardId,
    );
    return 'This action adds a new comment';
  }
  async delete(id: string, cardId: string, user: User) {
    const commentDeleted = await this.commentModel.findOneAndDelete({
      _id: id,
      author: user._id,
    });
    if (!commentDeleted) throw new CustomException('something went wrong');
    await this.commentsGateway.handleDeleteComment(id, cardId);
    return commentDeleted;
  }
  async findAllByCardId(cardId: string, user: User) {
    const card = await this.cardService.findOne(cardId, user);
    if (!card) throw new CustomException('Not card found');
    return card?.comments?.sort((a, b) =>
      a.createdAt.getTime() > b.createdAt.getTime() ? -1 : 1,
    );
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
