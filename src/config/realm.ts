import { Realm } from '@realm/react';

export interface IProgram {
  id: string;
  title: string;
  thumbnailUrl: string;
  currentTime: number;
  duration: number;
}

export class ProgramDocument extends Realm.Object {
  static schema = {
    name: 'ProgramDocument',
    properties: {
      id: 'string',
      title: 'string',
      thumbnailUrl: 'string',
      currentTime: 'float',
      duration: 'float',
    },
    primaryKey: 'id',
  };
}

const realm = new Realm({
  schema: [ProgramDocument],
});
export const saveProgram = (program: IProgram) => {
  try {
    realm.write(() => {
      realm.create(ProgramDocument.name, program, true);
    });
  } catch (error) {
    console.log('save program failed', error);
  }
};

export default realm;
