import { IntrospectionResultData } from 'apollo-cache-inmemory'
import fetch from 'node-fetch'

import { writeFile } from './utils/file-system'

interface IntrospectionQueryResult {
  data: IntrospectionResultData
}

const extractFragmentTypes = async () => {
  const response = await fetch(process.env.API_URI || '', {
    body: JSON.stringify({
      query:
        'query IntrospectionQuery { __schema { types { kind name possibleTypes { name } } } }',
    }),
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
  })
  const { data }: IntrospectionQueryResult = await response.json()
  const types = data.__schema.types.filter(
    ({ possibleTypes }) => possibleTypes !== null
  )

  await writeFile(
    'src/fragment-types.json',
    `${JSON.stringify(
      { ...data, __schema: { ...data.__schema, types } },
      null,
      2
    )}\n`
  )
}

export default extractFragmentTypes
