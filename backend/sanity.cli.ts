import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'zdpjfpgh',
    dataset: 'development',
  },
  deployment: {
    autoUpdates: true,
    appId: 'b811dc416a33cf7b36bf7f71',
  },
})
