import AWS from 'aws-sdk'
import { promises as fs } from 'fs'
import path from 'path'

const api = {
  fetch: async () => {
    AWS.config.update({ region: 'ap-southeast-2' })
    const s3 = new AWS.S3()
    const bucketName = 'anchorscad'

    let keys = []
    const listAllPaths = async () => {
      // Set the listObjectsV2 parameters
      const params = {
        Bucket: bucketName,
      }

      try {
        const data = await s3
          .makeUnauthenticatedRequest('listObjectsV2', params)
          .promise()
        keys.push(...data.Contents.map((x) => x.Key))

        // If the response is truncated, call the function again with the ContinuationToken
        if (data.IsTruncated) {
          params.ContinuationToken = data.NextContinuationToken
          await listAllPaths()
        }
      } catch (err) {
        console.log(err)
      }
    }
    await listAllPaths()
    return keys
  },
  cache: {
    get: async (modelPath) => {
      const data = await fs.readFile(path.join(process.cwd(), 'src/models.db'))
      const models = JSON.parse(data)
      return models.find((model) => model.path === modelPath)
    },
    set: async (keys) => {
      const models = []
      keys.forEach((key) => {
        const dir = path.dirname(key)
        const file = path.basename(key)
        const model = models.find((model) => model.path === dir)
        if (model) {
          model.files.push(file)
        } else {
          models.push({
            path: dir,
            files: [file],
          })
        }
      })
      return await fs.writeFile(
        path.join(process.cwd(), 'src/models.db'),
        JSON.stringify(models)
      )
    },
  },
}

export default api
