import { createHighlightPlugin } from '@frontend/src/serlo-editor/plugins/highlight'
import { createInputExercisePlugin } from '@frontend/src/serlo-editor/plugins/input-exercise'
import { createMultimediaExplanationPlugin } from '@frontend/src/serlo-editor/plugins/multimedia-explanation'
import { createRowsPlugin } from '@frontend/src/serlo-editor/plugins/rows'
import { createScMcExercisePlugin } from '@frontend/src/serlo-editor/plugins/sc-mc-exercise'
import { createSerloInjectionPlugin } from './serlo-injection'
import { createSpoilerPlugin } from '@frontend/src/serlo-editor/plugins/spoiler'
import { createTextPlugin } from '@frontend/src/serlo-editor/plugins/text'
import { createBoxPlugin } from '@frontend/src/serlo-editor/plugins/box'
import { equationsPlugin } from '@frontend/src/serlo-editor/plugins/equations'
import { createSerloTablePlugin } from '@frontend/src/serlo-editor/plugins/serlo-table'

import {
  EdusharingConfig,
  createEdusharingAssetPlugin,
} from './edusharing-asset'
import { anchorPlugin } from '@/serlo-editor/plugins/anchor'
import { geoGebraPlugin } from '@/serlo-editor/plugins/geogebra'

export function createPlugins(config: EdusharingConfig) {
  return {
    anchor: anchorPlugin,
    box: createBoxPlugin({
      allowedPlugins: ['text', 'equations', 'highlight', 'serloTable'],
    }),
    edusharingAsset: createEdusharingAssetPlugin(config),
    equations: equationsPlugin,
    geogebra: geoGebraPlugin,
    highlight: createHighlightPlugin(),
    inputExercise: createInputExercisePlugin({}),
    multimedia: createMultimediaExplanationPlugin({
      explanation: {
        plugin: 'rows',
        config: {
          allowedPlugins: [
            'text',
            'highlight',
            'anchor',
            'equations',
            'serloTable',
          ],
        },
      },
      plugins: ['edusharingAsset', 'geogebra'],
    }),
    rows: createRowsPlugin(),
    scMcExercise: createScMcExercisePlugin(),
    serloTable: createSerloTablePlugin({ allowImageInTableCells: false }),
    serloInjection: createSerloInjectionPlugin(),
    spoiler: createSpoilerPlugin({}),
    text: createTextPlugin(),
  }
}
