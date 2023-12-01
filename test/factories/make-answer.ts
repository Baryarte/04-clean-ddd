import { faker } from '@faker-js/faker'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Answer, AnswerProps } from '@/domain/forum/enterprise/entities/answer'
import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug'

export function makeAnswer(
  override: Partial<AnswerProps> = {},
  id?: UniqueEntityId,
) {
  const answer = Answer.create(
    {
      authorId: new UniqueEntityId(),
      content: faker.lorem.text(),
      questionId: override.questionId ?? new UniqueEntityId(),
      ...override,
    },
    id,
  )

  return answer
}
