import { Injectable } from '@angular/core';
import { AlignmentType, Document, HeadingLevel, Packer, Paragraph, TabStopPosition, TabStopType, TextRun, BorderStyle, Table, TableCell , TableRow } from 'docx';
import { UserDto, UserSearchDto } from 'src/app/dto';

@Injectable({
  providedIn: 'root'
})
export class WordService {

  constructor() { }

  public createDocx(usersList: UserDto[] | UserSearchDto[]): Document {
    const sections = [];

    for (const user of usersList) {
      const children = [];

      for (const [key, value] of Object.entries(user)) {
        if (value && key !== 'id' && key !== 'password') {
          children.push(this.createParagraph(key, value));
        }
      }

      sections.push({ children });
    }

    const document = new Document({ sections });

    return document;
  }


  public createParagraph(key: string, value: string): Paragraph {
    return new Paragraph({
      text: `${key}: ${value}`,
      heading: HeadingLevel.HEADING_2,
    });
  }

  // public createParagraph(title: string, text: string): Paragraph {
  //   return new Paragraph({
  //     alignment: AlignmentType.CENTER,
  //     children: [
  //       new TextRun(`Mobile: ${phoneNumber} | Website URL: ${profileUrl} | Email: ${email}`),
  //       new TextRun(''),
  //     ],
  //   });
  // }
}
