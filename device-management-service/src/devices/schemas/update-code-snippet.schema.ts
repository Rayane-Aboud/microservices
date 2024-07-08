import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateCodeSnippetDto {
    @IsString()
    @IsNotEmpty()
    readonly codeSnippet: string;
}
