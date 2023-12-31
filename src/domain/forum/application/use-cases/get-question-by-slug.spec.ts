﻿import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { CreateQuestionUseCase } from './create-question'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'
import { Question } from '../../enterprise/entities/question'
import { Slug } from '../../enterprise/entities/value-objects/slug'
import { makeQuestion } from 'test/factories/make-question'
import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { InMemoryQuestionAttachmentsRepository } from 'test/repositories/in-memory-question-attachments-repository'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let sut: GetQuestionBySlugUseCase

describe('Get Question By Slug', () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository()
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository(
      inMemoryQuestionAttachmentsRepository,
    )
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to get a question by its slug', async () => {
    const newQuestion = makeQuestion({
      slug: Slug.create('any-title'),
    })

    await inMemoryQuestionsRepository.create(newQuestion)

    const result = await sut.execute({
      slug: 'any-title',
    })
    console.log('INFERRNOOO')

    expect(result.isRight()).toBeTruthy()
    expect(result.value).toHaveProperty('question')
    if (result.isRight()) {
      expect(result.value?.question.title).toBe(newQuestion.title)
      expect(inMemoryQuestionsRepository.items[0].id).toEqual(
        result.value?.question.id,
      )
    }
  })
})
