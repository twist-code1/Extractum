import { IsNotEmpty, IsNumber, IsString } from "class-validator"
import { Prisma } from "@prisma/client"

export class CreateParagraphDto {
    @IsNotEmpty()
    @IsString()
    title: string

    @IsNotEmpty()
    @IsString()
    sourceLink: string

    @IsNotEmpty()
    content: Prisma.InputJsonValue

    @IsNotEmpty()
    @IsNumber()
    projectId: number
}