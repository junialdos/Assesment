import React from 'react';

const Breadcrumbs = React.lazy(() => import('./views/Base/Breadcrumbs'));
const Cards = React.lazy(() => import('./views/Base/Cards'));
const Carousels = React.lazy(() => import('./views/Base/Carousels'));
const Collapses = React.lazy(() => import('./views/Base/Collapses'));
const Dropdowns = React.lazy(() => import('./views/Base/Dropdowns'));
const Forms = React.lazy(() => import('./views/Base/Forms'));
const Jumbotrons = React.lazy(() => import('./views/Base/Jumbotrons'));
const ListGroups = React.lazy(() => import('./views/Base/ListGroups'));
const Navbars = React.lazy(() => import('./views/Base/Navbars'));
const Navs = React.lazy(() => import('./views/Base/Navs'));
const Paginations = React.lazy(() => import('./views/Base/Paginations'));
const Popovers = React.lazy(() => import('./views/Base/Popovers'));
const ProgressBar = React.lazy(() => import('./views/Base/ProgressBar'));
const Switches = React.lazy(() => import('./views/Base/Switches'));
const Tables = React.lazy(() => import('./views/Base/Tables'));
const Tabs = React.lazy(() => import('./views/Base/Tabs'));
const Tooltips = React.lazy(() => import('./views/Base/Tooltips'));
const BrandButtons = React.lazy(() => import('./views/Buttons/BrandButtons'));
const ButtonDropdowns = React.lazy(() => import('./views/Buttons/ButtonDropdowns'));
const ButtonGroups = React.lazy(() => import('./views/Buttons/ButtonGroups'));
const Buttons = React.lazy(() => import('./views/Buttons/Buttons'));
const Charts = React.lazy(() => import('./views/Charts'));
const Dashboard = React.lazy(() => import('./views/Dashboard'));
const CoreUIIcons = React.lazy(() => import('./views/Icons/CoreUIIcons'));
const Flags = React.lazy(() => import('./views/Icons/Flags'));
const FontAwesome = React.lazy(() => import('./views/Icons/FontAwesome'));
const SimpleLineIcons = React.lazy(() => import('./views/Icons/SimpleLineIcons'));
const Alerts = React.lazy(() => import('./views/Notifications/Alerts'));
const Badges = React.lazy(() => import('./views/Notifications/Badges'));
const Modals = React.lazy(() => import('./views/Notifications/Modals'));
const Colors = React.lazy(() => import('./views/Theme/Colors'));
const Typography = React.lazy(() => import('./views/Theme/Typography'));
const Widgets = React.lazy(() => import('./views/Widgets/Widgets'));
const Users = React.lazy(() => import('./views/Users/Users'));
const User = React.lazy(() => import('./views/Users/User'));
const Kompetens = React.lazy(() => import('./views/Kompetensi/Kompeten'));

const KompetenJabatan = React.lazy(() => import('./views/KompetenJabatan/KompetenJabatan'));

const Clusters = React.lazy(() => import('./views/Cluster/Cluster'));
const Kompetensi = React.lazy(() => import('./views/Kompetens/Kompetens'));
const Level = React.lazy(() => import('./views/Level/Levels'));
const Hasil = React.lazy(() => import('./views/Hasil/Hasil'));
const HasilUser = React.lazy(() => import('./views/Hasil/HasilUser'));
const Jabatan = React.lazy(() => import('./views/Jabatan/Jabatan'));
const ChartWilayah = React.lazy(() => import('./views/Dashboard/ChartWilayah'));
const ChartWilayahBagian = React.lazy(() => import('./views/Dashboard/ChartWilayahBagian'));
const Message = React.lazy(() => import('./views/Message/Message'));
const Profile = React.lazy(() => import('./views/Users/Profile'));
const Wilayah = React.lazy(() => import('./views/Wilayah/Wilayah'));
const UploadUser = React.lazy(() => import('./views/UploadUser/UploadUser'));
// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/theme', exact: true, name: 'Theme', component: Colors },
  { path: '/theme/colors', name: 'Colors', component: Colors },
  { path: '/theme/typography', name: 'Typography', component: Typography },
  { path: '/base', exact: true, name: 'Base', component: Cards },
  { path: '/base/cards', name: 'Cards', component: Cards },
  { path: '/base/forms', name: 'Forms', component: Forms },
  { path: '/base/switches', name: 'Switches', component: Switches },
  { path: '/base/tables', name: 'Tables', component: Tables },
  { path: '/base/tabs', name: 'Tabs', component: Tabs },
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', component: Breadcrumbs },
  { path: '/base/carousels', name: 'Carousel', component: Carousels },
  { path: '/base/collapses', name: 'Collapse', component: Collapses },
  { path: '/base/dropdowns', name: 'Dropdowns', component: Dropdowns },
  { path: '/base/jumbotrons', name: 'Jumbotrons', component: Jumbotrons },
  { path: '/base/list-groups', name: 'List Groups', component: ListGroups },
  { path: '/base/navbars', name: 'Navbars', component: Navbars },
  { path: '/base/navs', name: 'Navs', component: Navs },
  { path: '/base/paginations', name: 'Paginations', component: Paginations },
  { path: '/base/popovers', name: 'Popovers', component: Popovers },
  { path: '/base/progress-bar', name: 'Progress Bar', component: ProgressBar },
  { path: '/base/tooltips', name: 'Tooltips', component: Tooltips },
  { path: '/buttons', exact: true, name: 'Buttons', component: Buttons },
  { path: '/buttons/buttons', name: 'Buttons', component: Buttons },
  { path: '/buttons/button-dropdowns', name: 'Button Dropdowns', component: ButtonDropdowns },
  { path: '/buttons/button-groups', name: 'Button Groups', component: ButtonGroups },
  { path: '/buttons/brand-buttons', name: 'Brand Buttons', component: BrandButtons },
  { path: '/icons', exact: true, name: 'Icons', component: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', component: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', component: Flags },
  { path: '/icons/font-awesome', name: 'Font Awesome', component: FontAwesome },
  { path: '/icons/simple-line-icons', name: 'Simple Line Icons', component: SimpleLineIcons },
  { path: '/notifications', exact: true, name: 'Notifications', component: Alerts },
  { path: '/notifications/alerts', name: 'Alerts', component: Alerts },
  { path: '/notifications/badges', name: 'Badges', component: Badges },
  { path: '/notifications/modals', name: 'Modals', component: Modals },
  { path: '/widgets', name: 'Widgets', component: Widgets },
  { path: '/charts', name: 'Charts', component: Charts },
  { path: '/users', exact: true,  name: 'Anggota', component: Users },
  { path: '/users/:id', exact: true, name: 'Anggota Detail', component: User },
  { path: '/kompetens', exact: true, name: 'Model', component: Kompetens },
  { path: '/kompetens/model/:id', exact: true, name: 'Jabatan', component: KompetenJabatan },
  { path: '/kompetens/model/:id/jabatan/:id_jabatan', exact: true, name: 'Cluster', component: Clusters },
  { path: '/kompetens/model/:id/jabatan/:id_jabatan/cluster/:id_cluster', exact: true, name: 'Kompetensi', component: Kompetensi },
  // { path: '/kompetens/model/:id', exact: true, name: 'Cluster', component: Clusters },
  { path: '/kompetens/model/Clusters', exact: true, name: 'Cluster', component: Clusters },
  // { path: '/kompetens/model/:id/cluster/:id_model/:id', exact: true, name: 'Kompeten', component: Kompetensi },
  { path: '/kompetens/model/:id/cluster/:id_model/:id/level/:id_model/:id_cluster/:id_kompetensi', exact: true, name: 'Level', component: Level },
  { path: '/Hasil', exact: true, name: 'Hasil', component: Hasil },
  { path: '/Hasil/User/:id', exact: true, name: 'Hasil Anggota', component: HasilUser },
  { path: '/Jabatan', exact: true, name: 'Jabatan', component: Jabatan },
  { path: '/Wilayah/:id', exact: true, name: 'Wilayah', component: ChartWilayah },
  { path: '/Wilayah/bagian/:id', exact: true, name: 'Bagian', component: ChartWilayahBagian },
  { path: '/Message', exact: true, name: 'Message', component: Message },
  { path: '/profile', exact: true, name: 'Profile', component: Profile },
  { path: '/wilayah', exact: true, name: 'Wilayah', component: Wilayah },
  { path: '/import', exact: true, name: 'Import Anggota', component: UploadUser },
  
];

export default routes;
