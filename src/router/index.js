import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

function importComponent(path){
  return () => import(`../components/${path}.vue`);
}

const routes = [
  {
    path: '/manager',
    name: 'Manager',
    meta: {title: 'Manager'},
    component: importComponent("Manager/DashboardLayoutManager"),
    children: [
      {
        path: "/promo",
        name: "Promo",
        meta: {title: 'Promo'},
        component: importComponent("Manager/Promo"), 
      },
      {
        path: "/aturJadwal",
        name: "Atur_Jadwal",
        meta: {title: 'Atur Jadwal'},
        component: importComponent("Manager/AturJadwal"), 
      },
      {
        path: "/jadwalKaryawan",
        name: "JadwalKaryawan",
        meta: {title: 'Jadwal Karyawan'},
        component: importComponent("Manager/JadwalKaryawan"), 
      },
      {
        path: "/readPegawai",
        name: "TampilDataPegawai",
        meta: {title: 'Tampil Data Pegawai'},
        component: importComponent("Manager/ReadPegawai"), 
      },
      {
        path: "/readMitra",
        name: "TampilDataMitra",
        meta: {title: 'Tampil Data Mitra'},
        component: importComponent("Manager/ReadMitra"), 
      },
      {
        path: "/readMobil",
        name: "TampilDataMobil",
        meta: {title: 'Tampil Data Mobil'},
        component: importComponent("Manager/ReadMobil"), 
      },
      {
        path: "/readDriver",
        name: "TampilDataDriver",
        meta: {title: 'Tampil Data Driver'},
        component: importComponent("Manager/ReadDriver"), 
      },
    ]
  },
  {
    path: '/admin',
    name: 'Admin',
    meta: {title: 'Admin'},
    component: importComponent("Admin/DashboardLayoutAdmin"),
    children: [
      {
        path: "/pegawai",
        name: "Pegawai",
        meta: {title: 'Pegawai'},
        component: importComponent("Admin/Pegawai"), 
      },
      {
        path: "/mitra",
        name: "Mitra",
        meta: {title: 'Mitra'},
        component: importComponent("Admin/Mitra"), 
      },
      {
        path: "/mobil",
        name: "Mobil",
        meta: {title: 'Mobil'},
        component: importComponent("Admin/Mobil"), 
      },
      {
        path: "/driver",
        name: "Driver",
        meta: {title: 'Driver'},
        component: importComponent("Admin/Driver"), 
      },
      {
        path: "/readJadwalinAdmin",
        name: "TampilJadwalPegawai1",
        meta: {title: 'Tampil Jadwal Pegawai'},
        component: importComponent("Admin/ReadJadwal1"), 
      },
    ]
  },
  {
    path: '/cs',
    name: 'CS',
    meta: {title: 'Customer Service'},
    component: importComponent("CS/DashboardLayoutCS"),
    children: [
      {
        path: "/readJadwalinCS",
        name: "TampilJadwalPegawai2",
        meta: {title: 'Tampil Jadwal Pegawai'},
        component: importComponent("CS/ReadJadwal2"), 
      },
      {
        path: "/customerChecks",
        name: "CustomerChecks",
        meta: {title: 'Customer Checks'},
        component: importComponent("CS/CustomerChecks"), 
      },
      {
        path: "/transaksiChecks",
        name: "TransaksiChecks",
        meta: {title: 'Transaksi Checks'},
        component: importComponent("CS/TransaksiChecks"), 
      },
    ]
    
  },
  {
    path: '/Customer',
    name: 'Customer',
    component: importComponent("Customer/DashboardLayoutCustomer"),
    children: [
      {
        path: "/beranda",
        name: "Beranda",
        meta: {title: 'AJR | Beranda'},
        component: importComponent("Customer/Beranda"), 
      },
      {
        path: "/transaksi",
        name: "Transaksi",
        meta: {title: 'AJR | Riwayat Transaksi'},
        component: importComponent("Customer/Transaksi"), 
      },
      {
        path: "/profil",
        name: "Profil",
        meta: {title: 'AJR | Profil'},
        component: importComponent("Customer/Profil"), 
      },
      {
        path: "/ubahEmail",
        name: "UbahEmail",
        meta: {title: 'AJR | Ubah Email'},
        component: importComponent("Customer/UbahEmail"), 
      },
      {
        path: "/ubahPassword",
        name: "UbahPassword",
        meta: {title: 'AJR | Ubah Password'},
        component: importComponent("Customer/UbahPassword"), 
      },
      {
        path: "/buatTransaksi",
        name: "TransaksiBaru",
        meta: {title: 'AJR | Buat Transaksi Baru'},
        component: importComponent("Customer/TransaksiBaru"), 
      },
      {
        path: "/ubahTransaksi",
        name: "TransaksiEdit",
        meta: {title: 'AJR | Ubah Transaksi '},
        component: importComponent("Customer/TransaksiEdit"), 
      },
    ]
    
  },
  {
    path: '/AtmaJayaRental',
    name: 'AJR',
    meta: {title: 'Atma Jogja Rental'},
    component: importComponent("AtmaJayaRentalLP"),
  },
  {
    path: '/Login',
    name: 'Login',
    meta: {title: 'AJR | Login'},
    component: importComponent("Login"),
  },
  {
    path: '/Register',
    name: 'Register',
    meta: {title: 'AJR | Register'},
    component: importComponent("Register"),
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  if(to.name !== 'AJR' && sessionStorage.getItem("token")===null && (to.name !== 'Login' && to.name !== 'Register')){
      next({ name: 'AJR'});
  }else next();
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  if(to.name !== 'Manager' && sessionStorage.getItem("token")!==null && sessionStorage.getItem("role")==='pegawai' && sessionStorage.getItem("idRole")==1 
  && (to.name !== 'Promo' && to.name !== 'Atur_Jadwal' && to.name !== 'JadwalKaryawan' && to.name !== 'TampilDataPegawai' && to.name !== 'TampilDataDriver')
  && to.name !== 'TampilDataMitra' && to.name !== 'TampilDataMobil'){
      next({ name: 'Manager'});
  }else next();
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  if(to.name !== 'Admin' && sessionStorage.getItem("token")!==null && sessionStorage.getItem("role")==='pegawai' && sessionStorage.getItem("idRole")==2 
  && (to.name !== 'Mobil' && to.name !== 'Mitra' && to.name !== 'Pegawai' && to.name !== 'Driver' && to.name !== 'TampilJadwalPegawai1')){
      next({ name: 'Admin'});
  }else next();
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  if(to.name !== 'CS' && sessionStorage.getItem("token")!==null && sessionStorage.getItem("role")==='pegawai' && sessionStorage.getItem("idRole")==3
  && (to.name !== 'CustomerChecks' && to.name !== 'TransaksiChecks'  && to.name !== 'TampilJadwalPegawai2')){
      next({ name: 'CS'});
  }else next();
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  if(sessionStorage.getItem('statusBerkas') === 'Ditolak' && to.name !== 'Profil' && sessionStorage.getItem("token")!==null && sessionStorage.getItem("role")==='customer' ){
      next({ name: 'profil'});
  }else next();
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  if(sessionStorage.getItem('statusBerkas') === 'Diterima' && to.name !== 'Beranda' && sessionStorage.getItem("token")!==null && sessionStorage.getItem("role")==='customer' 
  && (to.name !== 'Profil' && to.name !== 'Transaksi' && to.name !== 'TransaksiBaru' && to.name !== 'UbahEmail' && to.name !== 'UbahPassword'  && to.name !== 'TransaksiEdit' )){
      next({ name: 'beranda'});
  }else next();
});

export default router
