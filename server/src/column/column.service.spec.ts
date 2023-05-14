import { Test, TestingModule } from '@nestjs/testing';
import { ColumnService } from './column.service';
import { convertToObjectId } from 'src/util';
import { User } from 'src/user/entities/user.entity';
import { ObjectId } from 'mongodb';
import { UserService } from 'src/user/user.service';
describe('ColumnService', () => {
  let service: ColumnService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ColumnService],
    }).compile();

    service = module.get<ColumnService>(ColumnService);
  });

  it('should be defined', () => {
    const userId = '63b92ec4e11295d7e88a879b';
    const data = [
      {
        _id: '643ba1fcf84c5c28f0025653',
        title: 'adsaddasdsadsadsadasdasd',
        order: '0|000000:',
        createdAt: '2023-04-16T07:21:32.267Z',
        updatedAt: '2023-05-13T11:35:48.255Z',
        cards: [],
      },
      {
        _id: '643ba323f84c5c28f00256a5',
        title: 'abcxyz',
        order: '0|090000:',
        createdAt: '2023-04-16T07:26:27.855Z',
        updatedAt: '2023-04-16T07:33:43.178Z',
        cards: [],
      },
      {
        _id: '643ba4bff84c5c28f0025712',
        title: 'xyzabc',
        order: '0|0i0000:',
        createdAt: '2023-04-16T07:33:19.307Z',
        updatedAt: '2023-05-02T15:59:33.592Z',
        cards: [
          {
            _id: '64513365fb4a533017f38cd7',
            title: 'xxxx',
            order: '0|hzzzzz:',
            members: [],
            attachment: [],
            comments: [],
            updatedAt: '2023-05-02T15:59:33.532Z',
            createdAt: '2023-05-02T15:59:33.532Z',
            columnId: '643ba4bff84c5c28f0025712',
            columnTitle: 'xyzabc',
          },
        ],
      },
    ];
    const result = service.getColumnForCardId('643ba0f5f84c5c28f00255ff');
    expect(result).toBeDefined();
    expect(result).toBe(data);
  });
});
