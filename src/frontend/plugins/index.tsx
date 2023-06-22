import IconBox from '@/assets-webkit/img/editor/icon-box.svg'
import IconEquation from '@/assets-webkit/img/editor/icon-equation.svg'
import IconGeogebra from '@/assets-webkit/img/editor/icon-geogebra.svg'
import IconHighlight from '@/assets-webkit/img/editor/icon-highlight.svg'
import IconImage from '@/assets-webkit/img/editor/icon-image.svg'
import IconInjection from '@/assets-webkit/img/editor/icon-injection.svg'
import IconMultimedia from '@/assets-webkit/img/editor/icon-multimedia.svg'
import IconSpoiler from '@/assets-webkit/img/editor/icon-spoiler.svg'
import IconTable from '@/assets-webkit/img/editor/icon-table.svg'
import IconText from '@/assets-webkit/img/editor/icon-text.svg'
import IconFallback from '@/assets-webkit/img/editor/icon-fallback.svg'
import IconVideo from '@/assets-webkit/img/editor/icon-video.svg'
import { shouldUseFeature } from '@/components/user/profile-experimental'
import { LoggedInData, UuidType } from '@/data-types'
import { Instance } from '@/fetcher/graphql-types/operations'
import { PluginsContextPlugins } from '@/serlo-editor/core/contexts/plugins-context'
import { importantPlugin } from '@/serlo-editor/plugins/_on-the-way-out/important/important'
import { layoutPlugin } from '@/serlo-editor/plugins/_on-the-way-out/layout'
import { anchorPlugin } from '@/serlo-editor/plugins/anchor'
import { articlePlugin } from '@/serlo-editor/plugins/article'
import { createBoxPlugin } from '@/serlo-editor/plugins/box'
import { deprecatedPlugin } from '@/serlo-editor/plugins/deprecated'
import { equationsPlugin } from '@/serlo-editor/plugins/equations'
import { errorPlugin } from '@/serlo-editor/plugins/error'
import { exercisePlugin } from '@/serlo-editor/plugins/exercise'
import { geoGebraPlugin } from '@/serlo-editor/plugins/geogebra'
import { H5pPlugin } from '@/serlo-editor/plugins/h5p/h5p'
import { createHighlightPlugin } from '@/serlo-editor/plugins/highlight'
import { imagePlugin } from '@/serlo-editor/plugins/image/image-with-serlo-config'
import { injectionPlugin } from '@/serlo-editor/plugins/injection'
import { createInputExercisePlugin } from '@/serlo-editor/plugins/input-exercise'
import { createMultimediaExplanationPlugin } from '@/serlo-editor/plugins/multimedia-explanation'
import { pageLayoutPlugin } from '@/serlo-editor/plugins/page-layout'
import { pagePartnersPlugin } from '@/serlo-editor/plugins/page-partners'
import { pageTeamPlugin } from '@/serlo-editor/plugins/page-team'
import { pasteHackPlugin } from '@/serlo-editor/plugins/paste-hack'
import { createRowsPlugin } from '@/serlo-editor/plugins/rows'
import { createScMcExercisePlugin } from '@/serlo-editor/plugins/sc-mc-exercise'
import { separatorPlugin } from '@/serlo-editor/plugins/separator'
import { createSerloTablePlugin } from '@/serlo-editor/plugins/serlo-table'
import { appletTypePlugin } from '@/serlo-editor/plugins/serlo-types-plugins/applet'
import { articleTypePlugin } from '@/serlo-editor/plugins/serlo-types-plugins/article'
import { courseTypePlugin } from '@/serlo-editor/plugins/serlo-types-plugins/course'
import { coursePageTypePlugin } from '@/serlo-editor/plugins/serlo-types-plugins/course-page'
import { eventTypePlugin } from '@/serlo-editor/plugins/serlo-types-plugins/event'
import { pageTypePlugin } from '@/serlo-editor/plugins/serlo-types-plugins/page'
import { taxonomyTypePlugin } from '@/serlo-editor/plugins/serlo-types-plugins/taxonomy'
import { textExerciseTypePlugin } from '@/serlo-editor/plugins/serlo-types-plugins/text-exercise'
import { textExerciseGroupTypePlugin } from '@/serlo-editor/plugins/serlo-types-plugins/text-exercise-group'
import { textSolutionTypePlugin } from '@/serlo-editor/plugins/serlo-types-plugins/text-solution'
import { userTypePlugin } from '@/serlo-editor/plugins/serlo-types-plugins/user'
import { videoTypePlugin } from '@/serlo-editor/plugins/serlo-types-plugins/video'
import { solutionPlugin } from '@/serlo-editor/plugins/solution'
import { createSpoilerPlugin } from '@/serlo-editor/plugins/spoiler'
import { createTextPlugin } from '@/serlo-editor/plugins/text'
import { videoPlugin } from '@/serlo-editor/plugins/video'
import { createEdusharingAssetPlugin } from './edusharing-asset'
import { createSerloInjectionPlugin } from './serlo-injection'

// export type PluginType = 'text' | 'box'

export function createPlugins({
  instance,
  ltik,
}: {
  instance: Instance,
  ltik: string
}): PluginsContextPlugins {
    return [
    {
      type: 'text',
      plugin: createTextPlugin({ serloLinkSearch: instance === Instance.De }),
      visible: true,
      icon: <IconText />,
    },
    {
      type: 'box',
      plugin: createBoxPlugin({
        allowedPlugins: ['text', 'serloTable', 'edusharingAsset', 'equations', ]
      }),
      visible: true,
      icon: <IconBox />,
    },
    {
      type: 'edusharingAsset',
      plugin: createEdusharingAssetPlugin({ltik: ltik}),
      visible: true, 
      icon: <IconImage />,
    },
    {
      type: 'equations',
      plugin: equationsPlugin,
      visible: true,
      icon: <IconEquation />,
    },
    {
      type: 'geogebra',
      plugin: geoGebraPlugin,
      visible: true,
      icon: <IconGeogebra />,
    },
    {
      type: 'highlight',
      plugin: createHighlightPlugin(),
      visible: true,
      icon: <IconHighlight />,
    },
    {
      type: 'serloInjection',
      plugin: createSerloInjectionPlugin(),
      visible: true,
      icon: <IconInjection />,
    },
    {
      type: 'multimedia',
      plugin: createMultimediaExplanationPlugin(),
      visible: true,
      icon: <IconMultimedia />,
    },
    {
      type: 'spoiler',
      plugin: createSpoilerPlugin({}),
      visible: true,
      icon: <IconSpoiler />,
    },
    {
      type: 'serloTable',
      plugin: createSerloTablePlugin(),
      visible: true,
      icon: <IconTable />,
    },
    {
      type: 'inputExercise', 
      plugin: createInputExercisePlugin({}),
      visible: true,
      icon: <IconFallback />
    },
    {
      type: 'scMcExercise', 
      plugin: createScMcExercisePlugin(), 
      visible: true,
      icon: <IconFallback />
    },
    { 
      type: 'rows',
      plugin: createRowsPlugin() 
    },
  ]
}