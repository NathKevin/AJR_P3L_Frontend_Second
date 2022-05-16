<template>
    <v-main class="beranda">
        <br><br><br>

        <v-container fluid>
            <v-row>
                <v-col sm="12">
                    <v-progress-circular
                        size="60"
                        v-if="load"
                        indeterminate
                        color="primary"
                    ></v-progress-circular>
                    <v-overlay :value="load"></v-overlay>
                    <v-card elevation="10" class="overlap" v-if="isTransaksi" width="auto" height="auto" max-height="auto">
                        <v-toolbar class="cyan lighten-2" min-height="80" max-height="auto">
                            <h2 v-if="this.transaksi.statusTransaksi == 'Peminjaman Berlangsung'" class=" ml-7 mt-4 text-left">Peminjaman yang sedang berlangsung</h2>
                            <h2 v-else-if="this.transaksi.statusTransaksi == 'Diterima'" class=" ml-7 mt-4 text-left">Peminjaman telah diproses</h2>
                            <h2 v-else class=" ml-7 mt-4 text-left">Peminjaman dalam antrian</h2>
                            <v-spacer></v-spacer>
                            <v-btn v-if="this.transaksi.statusTransaksi == 'Menunggu Konfirmasi'" elevation="8" plain text class="mt-4 blue darken-4 white--text" @click="cekDateandTime('Ubah')"><Strong>Ubah Transaksi</Strong></v-btn>
                            <h4 v-if="this.transaksi.statusTransaksi == 'Diterima'" class=" mr-7 mt-4 text-left">Maksimal pembatalan adalah 12 jam sebelum peminjaman berlangsung</h4>
                            <v-btn v-if="this.transaksi.statusTransaksi == 'Diterima'" elevation="8" color="red" text class="mt-4 red lighten-4" @click="cekDateandTime('Batal')"><Strong>Batalkan Transaksi</Strong></v-btn>
                            <v-btn v-if="this.transaksi.statusTransaksi == 'Peminjaman Berlangsung'" @click="bayarHandler" class="white mt-4"><Strong>Bayar</Strong></v-btn>
                        </v-toolbar>
                        <v-divider></v-divider>
                        <v-divider></v-divider>
                        <br>
                        <v-row>
                            <v-col lg="2" sm="2" md="2">
                                <h4 class="text-left ml-4">No. Transaksi</h4>
                            </v-col>
                            <v-col lg="1" sm="1">
                                <h4 class="text-left">:</h4>
                            </v-col>
                            <v-col >
                                <h4 class="text-left">{{ transaksi.idTransaksi }}</h4>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col lg="2" sm="2" md="2">
                                <p class="text-left ml-4">Tanggal Transaksi</p>
                            </v-col>
                            <v-col lg="1" sm="1">
                                <p class="text-left">:</p>
                            </v-col>
                            <v-col >
                                <p class="text-left">{{ transaksi.tanggalTransaksi }}</p>
                            </v-col>
                        </v-row>
                        <v-row dense>
                            <v-col lg="2" sm="2" md="2">
                                <p class="text-left ml-4">Tanggal Sewa</p>
                            </v-col>
                            <v-col lg="1" sm="1">
                                <p class="text-left">:</p>
                            </v-col>
                            <v-col >
                                <p class="text-left">{{ transaksi.tanggalWaktuSewa }}</p>
                            </v-col>
                        </v-row>
                        <v-row dense>
                            <v-col lg="2" sm="2" md="2">
                                <p class="text-left ml-4">Tanggal Selesai</p>
                            </v-col>
                            <v-col lg="1" sm="1">
                                <p class="text-left">:</p>
                            </v-col>
                            <v-col >
                                <p class="text-left">{{ transaksi.tanggalWaktuSelesai }}</p>
                            </v-col>
                        </v-row>
                        <v-row dense>
                            <v-col lg="2" sm="2" md="2">
                                <p class="text-left ml-4">Nama Driver</p>
                            </v-col>
                            <v-col lg="1" sm="1">
                                <p class="text-left">:</p>
                            </v-col>
                            <v-col >
                                <p class="text-left">{{ this.namaDriver }}</p>
                            </v-col>
                        </v-row>
                        <v-row dense>
                            <v-col lg="2" sm="2" md="2">
                                <p class="text-left ml-4">Nama Mobil</p>
                            </v-col>
                            <v-col lg="1" sm="1">
                                <p class="text-left">:</p>
                            </v-col>
                            <v-col >
                                <p class="text-left">{{ this.namaMobil }}</p>
                            </v-col>
                        </v-row>
                        <v-row dense>
                            <v-col lg="2" sm="2" md="2">
                                <p class="text-left ml-4">Plat Nomor</p>
                            </v-col>
                            <v-col lg="1" sm="1">
                                <p class="text-left">:</p>
                            </v-col>
                            <v-col >
                                <p class="text-left">{{ this.platNomor }}</p>
                            </v-col>
                        </v-row>
                        <v-row dense>
                            <v-col lg="2" sm="2" md="2">
                                <p class="text-left ml-4">Promo</p>
                            </v-col>
                            <v-col lg="1" sm="1">
                                <p class="text-left">:</p>
                            </v-col>
                            <v-col >
                                <p class="text-left">{{ this.namaPromo }}</p>
                            </v-col>
                        </v-row>
                        <v-row dense>
                            <v-col lg="2" sm="2" md="2">
                                <p class="text-left ml-4">Besar Promo</p>
                            </v-col>
                            <v-col lg="1" sm="1">
                                <p class="text-left">:</p>
                            </v-col>
                            <v-col >
                                <p class="text-left">{{ this.besarPromo * 100}}%</p>
                            </v-col>
                        </v-row>
                        <v-row dense>
                            <v-col lg="2" sm="2" md="2">
                                <p class="text-left ml-4">Status Transaksi</p>
                            </v-col>
                            <v-col lg="1" sm="1">
                                <p class="text-left">:</p>
                            </v-col>
                            <v-chip :class="colorChip">
                                {{ getStatusTransaksi() }}
                            </v-chip>
                        </v-row>
                    </v-card>
                    <v-card elevation="10" class="overlap" v-if="empty">
                        <h2 class="cyan lighten-2 pl-7 pb-5 pt-5 text-left">Peminjaman yang sedang berlangsung</h2>
                        <v-divider></v-divider>
                        <v-divider></v-divider>
                        <br>
                        <h4>Tidak ada Peminjaman yang sedang Berlangsung</h4>
                        <br>
                        <v-btn to="/buatTransaksi" color="blue darken-4" elevation="5" class="white--text mb-10" >Pinjam Mobil Sekarang</v-btn>
                    </v-card>
                </v-col>
            </v-row>
            <v-row>
                <v-col sm="6" md="12" lg="6">
                    <v-hover v-slot="{hover}">
                        <v-card elevation="10" class="overlap" v-if="other">
                            <v-toolbar class="cyan lighten-2 " min-height="50">
                                <h3 class="ml-7 text-left">Berita Pengumuman</h3>
                            </v-toolbar>
                            <v-img style="filter: brightness(50%);" :src="image">
                            </v-img>
                                <v-expand-transition>
                                    <div
                                        v-if="hover"
                                        class=" transition-fast-in-fast-out v-card--reveal white--text"
                                        style="height: 80%;"
                                    >
                                        <h4 class="text-left mr-6 ml-6 mt-5"> 
                                            Selamat datang di website Atma Jogja Rental. Kami telah hadir membawakan fitur baru sehingga 
                                            mempermudahkan anda dalam menyewa alat transportasi untuk berpegian di daerah Jogja.

                                        </h4>
                                    </div>
                                </v-expand-transition>
                            <v-toolbar style="opacity: 80%" absolute bottom width="750">
                                <v-card-title>
                                    <strong>Kami Hadir dengan website dan aplikasi mobile</strong> 
                                </v-card-title>
                                <v-spacer></v-spacer>
                                <v-card-sub-title>
                                    Lebih cepat, lebih efisien
                                </v-card-sub-title>
                            </v-toolbar>
                        </v-card>
                    </v-hover>
                </v-col>
                <v-col sm="6"  md="12" lg="6">
                    <v-card elevation="10" class="overlap" v-if="other">
                        <v-toolbar  class="cyan lighten-2" min-height="50">
                            <h3 class="ml-7 text-left">Promo yang tersedia</h3>
                        </v-toolbar>
                        <v-list dense disabled>
                            <v-list-item v-for="(item,key) in promosAvailable" :key="key">
                                <v-list-item-content>
                                    <p class="text-left">{{ item }}</p>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>

        <v-dialog v-model="dialogWarning" persistent width="500">
            <v-card elevation="10" width="auto" height="auto">
                <v-toolbar color="white--text" class="red">
                    <v-icon class="mr-5" dark size="40">mdi-alert</v-icon>
                    <span  class="headline">Opss..!</span>
                </v-toolbar>
                <h3 class="red--text mt-5" >Data anda tidak valid atau Driver kami menolak permintaan anda</h3>
                <br>
                <Strong>
                    <p class="ml-4 mr-4">
                        Transaksi Peminjaman Batal.
                        Customer Service kami telah menemukan data yang tidak valid pada form transaksi anda
                        atau Driver kami menolak permintaan anda. Cek kembali transaksi anda sebelum mengumpulkannya atau pilih driver lainnya.
                        Silakan menginputkan form peminjaman baru.
                    </p>
                </Strong>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="updateStatusTransaksi"> OK </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogTolak" persistent width="500">
            <v-card elevation="10" width="auto" height="auto">
                <v-toolbar color="white--text" class="yellow darken-3">
                    <span  class="headline">Pemberitahuan!</span>
                </v-toolbar>
                <h3 class="red--text mt-5" >Anda sudah tidak bisa membatalkan Peminjaman!</h3>
                <br>
                <Strong>
                    <p class="ml-4 mr-4">
                        Maksimal pembatalan adalah 12 jam sebelum peminjaman berlangsung
                    </p>
                </Strong>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialogTolak = !dialogTolak"> OK </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogTolakBayar" persistent width="500">
            <v-card elevation="10" width="auto" height="auto">
                <v-toolbar color="white--text" class="yellow darken-3">
                    <span  class="headline">Pemberitahuan!</span>
                </v-toolbar>
                <h3 class=" mt-5" >Peminjaman belum selesai!</h3>
                <br>
                <Strong>
                    <p class="ml-4 mr-4">
                        Kembalikan mobil menuju kantor AJR dan hubungi Customer Service kami untuk dapat memproses pembayaran.
                    </p>
                </Strong>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialogTolakBayar = !dialogTolakBayar"> OK </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogConfirm" width="500">
            <v-card width="auto" height="auto">
                <v-toolbar color="white--text" class="red">
                    <span  class="headline">Konfirmasi Transaksi Batal</span>
                </v-toolbar>
                <p class="red--text mt-5" >Apakah anda yakin ingin membatalkan peminjaman?</p>
                <Strong>
                    Seluruh data peminjaman anda akan kami hentikan dan tidak dapat di-recovery kembali.
                    Namun anda masih dapat melihat data transaksi ini di riwayat transaksi anda.
                </Strong>
                <br>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialogConfirm = !dialogConfirm"> Cancel </v-btn>
                    <v-btn color="blue darken-1" text @click="batalHandler" > Konfirmasi </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog width="700" v-model="dialogPembayaran">
            <v-card height="auto" width="700" max-height="auto" max-width="auto">
                <v-toolbar color="white--text" class="blue darken-4" flat>
                    <span  class="headline">Total Pembayaran</span>
                </v-toolbar>
                    <v-col sm="12" md="12" lg="8" xl="8">
                        <p class="text-left ml-5"> Total Biaya Driver : Rp {{ transaksi.totalBiayaDriver }},00</p>
                        <p class="text-left ml-5"> Total Biaya Mobil : Rp {{ transaksi.totalBiayaMobil }},00</p>
                        <p class="text-left ml-5"> Diskon : {{ besarPromo * 100 }}%</p>
                        <p class="text-left ml-5"> Total Diskon : Rp {{ transaksi.totalPromo }},00</p>
                        <p class="text-left ml-5"> Total Biaya Akhir : Rp {{ transaksi.totalBiaya }},00</p>
                    </v-col>
                    <v-col>
                        <v-file-input
                            v-if="transaksi.metodePembayaran == 'Transfer'"
                            outlined
                            rounded
                            dense
                            prepend-icon="mdi-file" 
                            label="File Bukti Transfer"
                            id="file1"
                            ref="fileGambar"
                        >
                        </v-file-input>
                    </v-col>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            color="blue darken-4"
                            class="white--text"
                            @click="confirmHandler"
                        >
                            Bayar
                        </v-btn>
                        <v-btn @click="dialogPembayaran = !dialogPembayaran" outlined color="red" text>
                            Cancel
                        </v-btn>
                    </v-card-actions>
            </v-card>
        </v-dialog>

         <v-snackbar v-model="snackbar" :color="color" timeout="3000" bottom >
            <div v-for="(errorInArray, i) in error_message" :key="i">
                <div v-for="(errorOutArray, i) in errorInArray" :key="i">
                    {{ errorOutArray }}
                </div>
            </div>
        </v-snackbar>

        <v-snackbar v-model="snackbar2" :color="color" timeout="3000" bottom >{{ success_message }}</v-snackbar>

    </v-main>
</template>

<script>
import image from "../../assets/carousel/car-rental2.jpg"

export default {
    name: 'transaksi',
    data() {
        return {
            idMobil: null,
            dialogWarning: false,
            dialogConfirm: false,
            dialogPembayaran: false,
            dialogTolak: false,
            dialogTolakBayar: false,
            snackbar: false,
            snackbar2: false,
            error_message: null,
            success_message: null,
            image : image,
            todayDay: null,
            todayDate: null,
            color : null,
            colorChip : null,
            load: true,
            empty: false,
            other: false,
            namaMobil: null,
            platNomor: null,
            namaDriver: null,
            namaCS: null,
            namaPromo : null,
            besarPromo : null,
            isTransaksi: false,
            transaksi: {},
            promos: [],
            promosAvailable : [],
            form:{
                statusTransaksi : null,
            },
        }
    },
    methods: {
        bayarHandler(){
            if(this.transaksi.tanggalWaktuKembali != null){
                this.dialogPembayaran = true
            }else{
                this.dialogTolakBayar = true;
            }
        },
        cekDateandTime(item){

            if(item == 'Ubah'){
                this.$router.push({ name: "TransaksiEdit",});
            }else{
                var today = new Date(Date.now());
                var dateTime1 = new Date(this.transaksi.tanggalWaktuSewa).substractHours(12);
                var dateTime2 = new Date(dateTime1).toLocaleString();
                
                dateTime2 = this.$moment(dateTime2).format('YYYY-MM-DD HH:mm:ss')
                today = this.$moment(today).format('YYYY-MM-DD HH:mm:ss');

                if(today > dateTime2){
                    this.dialogTolak = true;
                }else{
                    this.dialogConfirm = true;
                }
            }
        },
        getStatusTransaksi(){
            if(this.transaksi.statusTransaksi == 'Menunggu Konfirmasi'){
                this.colorChip = 'grey white--text'
            }else if(this.transaksi.statusTransaksi == 'Peminjaman Berlangsung'){
                 this.colorChip = 'blue darken-4 white--text'
            }else if(this.transaksi.statusTransaksi == 'Diterima'){
                 this.colorChip = 'green white--text'
            }
            return this.transaksi.statusTransaksi;
        },
        checkPromoAvailable(){
            for(let i=0; i<this.promos.length; i++){
                if(this.promos[i].kode == 'WKN'){
                    if(this.todayDay == 'Saturday' || this.todayDay == 'Sunday'){
                        this.promosAvailable.push(this.promos[i].jenisPromo);
                    }
                }
                if(this.promos[i].kode == 'MHS'){
                    if(sessionStorage.getItem('KP') != null){
                        this.promosAvailable.push(this.promos[i].jenisPromo);
                    }
                }
                if(this.promos[i].kode == 'BDAY'){
                    if(sessionStorage.getItem('tanggalLahir') == this.todayDate){
                        this.promosAvailable.push(this.promos[i].jenisPromo);
                    }
                }
                if(this.promos[i].kode == 'MDK'){
                    this.promosAvailable.push(this.promos[i].jenisPromo);
                }
            }
            if(this.promosAvailable == null){
                this.promosAvailable = 'Yah, belum ada promo untuk kamu'
            }
        },
        checkTransaksi(){
            if(this.transaksi == null){
                this.empty = true;
                this.isTransaksi = false;
                this.load = false;
                this.other = true;
            }else if(this.transaksi != null && this.transaksi.statusTransaksi == 'Ditolak'){
                this.isTransaksi = false;
                this.load = false;
                this.other = false;
            }else{
                this.load=false;
                this.isTransaksi = true;
                this.empty = false;
                this.other = true;
            }
        },
        async showByCustomer(){
            this.load = true;
            var url = this.$api + '/showInProgress/transaksi/' + sessionStorage.getItem('id');
            await this.$http.get(url, {
                  headers: {
                      'Authorization' : 'Bearer ' + sessionStorage.getItem('token')
                  }
            }).then(response => {
                this.transaksi = response.data.data;
                if(response.data.data != null){
                    this.isDitolak();
                    this.getCarName(response.data.data.idMobil);
                    this.getDriverName(response.data.data.idDriver);
                    this.getCustomerServiceName(response.data.data.idPegawai);
                    this.updateStatusTransaksiHandler();
                    this.getAllPromo();
                    this.getPromo(response.data.data.idPromo);
                }else{
                    this.getAllPromo();
                    this.checkTransaksi();
                }
            })
        },
        isDitolak(){
            if(this.transaksi.statusTransaksi == 'Ditolak'){
                this.form.statusTransaksi = 'Transaksi Ditolak'
                this.isTransaksi = false;
                this.dialogWarning = true;
            }
        },
        updateStatusTransaksiHandler(){
            if(this.transaksi != null && this.transaksi.statusTransaksi == "Diterima"){
                var date1 = new Date(Date.now()).toLocaleDateString();
                var date2 = this.$moment(date1).format("YYYY-MM-DD");
                var date3 = this.$moment(this.transaksi.tanggalWaktuSewa).format("YYYY-MM-DD");
                if(date2 == date3){
                    this.form.statusTransaksi = 'Peminjaman Berlangsung';
                    this.updateStatusTransaksi();
                }
            }
            
        },
        batalHandler(){
            this.form.statusTransaksi = 'Batal';
            this.updateStatusTransaksi();
        },
        editStatusMobil(){
            let newData = {
                statusKetersediaanMobil : 1
            };
            var url = this.$api + '/updateStatus/mobil/' + this.idMobil;
            this.load = true;
            this.$http.put(url, newData, {
                headers: {
                    'Authorization' : 'Bearer ' + sessionStorage.getItem('token')
                }
            }).then(response => {
                this.success_message = response.data.message;
                this.color = "green";
                this.snackbar2 = true;
                this.load = false;
                if(this.detailForm.idDriver != null){
                    console.log('INI ADA UBAH STATUS DRIVER DARI MOBILE')
                }
                location.reload();
            }).catch(error => {
                this.error_message = error.response.data.message;
                this.color = "red";
                this.snackbar = true;
                this.load = false;
            });
        },
        async updateStatusTransaksi(){
            this.load = true;
            var url = this.$api + '/updateStatus/transaksi/' + this.transaksi.idTransaksi;
            await this.$http.put(url, this.form,  {
                    headers: {
                        'Authorization' : 'Bearer ' + sessionStorage.getItem('token')
                    }
            }).then(response => {
                this.transaksi.statusTransaksi = response.data.data.statusTransaksi;
                this.editStatusMobil();
                this.getStatusTransaksi();
                location.reload();
            }).catch(error => {
                this.color = 'red';
                this.success_message = error.response.data.message; 
            })
            
        },
        async getCarName(item) {
            var url = this.$api + '/show/mobil/' + item;
            await this.$http.get(url, {
                  headers: {
                      'Authorization' : 'Bearer ' + sessionStorage.getItem('token')
                  }
            }).then(response => {
                this.idMobil = response.data.data.idMobil;
                this.namaMobil = response.data.data.namaMobil;
                this.platNomor = response.data.data.platNomor;
            })
        },
        async getDriverName(item) {
            var url = this.$api + '/show/driver/' + item;
            await this.$http.get(url, {
                  headers: {
                      'Authorization' : 'Bearer ' + sessionStorage.getItem('token')
                  }
            }).then(response => {
                if(response.data.data != null){
                    this.namaDriver = response.data.data.namaDriver;
                }else{
                    this.namaDriver = 'Tidak Menggunakan Driver';
                }
            })
        },
        async getCustomerServiceName(item) {
            var url = this.$api + '/show/pegawai/' + item;
            await this.$http.get(url, {
                  headers: {
                      'Authorization' : 'Bearer ' + sessionStorage.getItem('token')
                  }
            }).then(response => {
                this.namaCS = response.data.data.namaPegawai;
            })
        },
        async getPromo(item) {
            var url = this.$api + '/show/promo/' + item;
            await this.$http.get(url, {
                  headers: {
                      'Authorization' : 'Bearer ' + sessionStorage.getItem('token')
                  }
            }).then(response => {
                if(response.data.data != null){
                    this.namaPromo = response.data.data.jenisPromo;
                    this.besarPromo = response.data.data.besarPromo;
                }else{
                    this.namaPromo = 'Tidak Menggunakan Promo';
                    this.besarPromo = '0.0';
                }
                this.checkTransaksi();
            })
        },
        async getAllPromo(){
            var url = this.$api + '/promo';
            await this.$http.get(url, {
                  headers: {
                      'Authorization' : 'Bearer ' + sessionStorage.getItem('token')
                  }
            }).then(response => {
                this.promos = response.data.data;
                this.todayDay = response.data.day;
                this.todayDate = response.data.date;
                this.checkPromoAvailable();
            })
        },
        
    },

    async mounted(){
        await this.showByCustomer();
     }
}
</script>

<style scoped>
.overlap{
   animation: fadeInAnimation ease 3s;
    animation-iteration-count: 0.65;
    animation-fill-mode: forwards;
   opacity: 85%;
}

@keyframes fadeInAnimation {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}

.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  position: absolute;
  width: 100%;
}
</style>