<template>
    <v-main class="transaksiChecks">

        <div class="bg">
        <h1 v-if="isOpen">Transaksi Checks</h1>
        <br>
        <v-progress-circular
            size="60"
            v-if="load"
            indeterminate
            color="primary"
        ></v-progress-circular>
        <v-overlay :value="load"></v-overlay>

         <v-card v-if="isOpen" elevation="3">
            <v-card-title>
                <v-text-field
                    v-if="showBaru"
                    v-model="search1"
                    append-icon="mdi-magnify"
                    label="Search"
                    single-line
                    hide-details
                >
                </v-text-field>
                <v-text-field
                    v-if="showDiterima"
                    v-model="search2"
                    append-icon="mdi-magnify"
                    label="Search"
                    single-line
                    hide-details
                >
                </v-text-field>
                <v-text-field
                    v-if="showInProgress"
                    v-model="search3"
                    append-icon="mdi-magnify"
                    label="Search"
                    single-line
                    hide-details
                >
                </v-text-field>
                <v-text-field
                    v-if="showSelesai"
                    v-model="search4"
                    append-icon="mdi-magnify"
                    label="Search"
                    single-line
                    hide-details
                >
                </v-text-field>
                <v-text-field
                    v-if="showDitolak"
                    v-model="search5"
                    append-icon="mdi-magnify"
                    label="Search"
                    single-line
                    hide-details
                >
                </v-text-field>
                <v-text-field
                    v-if="showBatal"
                    v-model="search6"
                    append-icon="mdi-magnify"
                    label="Search"
                    single-line
                    hide-details
                >
                </v-text-field>
                <v-spacer></v-spacer>
            </v-card-title>

            <div>
                <v-row>
                    <v-chip-group>
                        <v-chip @click="handler1()"  class="ml-5 mt-3 mb-2" color="white" text-color="blue lighten-2" > Transaksi Baru</v-chip>
                        <v-chip @click="handler2()"  class="ml-5 mt-3 mb-2" color="white" text-color="blue lighten-2" > Transaksi Diterima</v-chip>
                        <v-chip @click="handler3()"  class="ml-5 mt-3 mb-2" color="white" text-color="blue lighten-2" > Transaksi In Progress</v-chip>
                        <v-chip @click="handler4()"  class="ml-5 mt-3 mb-2" color="white" text-color="blue lighten-2" > Transaksi Selesai</v-chip>
                        <v-chip @click="handler5()" class="ml-5 mt-3 mb-2" color="white" text-color="blue lighten-2" > Transaksi Ditolak</v-chip>
                        <v-chip @click="handler6()" class="ml-5 mt-3 mb-2" color="white" text-color="blue lighten-2" > Transaksi Batal</v-chip>
                    </v-chip-group>
                </v-row>
            </div>

            <v-data-table v-if="showBaru" :headers="headers" :items="newTransaksi" :search="search1" >
                <template v-slot:[`item.statusTransaksi`]="{ item }">
                    <span v-if="item.statusTransaksi == 'Menunggu Konfirmasi'" > <v-chip small label class="grey" color="white--text">Menunggu Konfirmasi</v-chip></span>
                </template>
                <template v-slot:[`item.statusPembayaran`]="{ item }">
                    <span v-if="item.statusPembayaran == 1" > <v-chip small label class="green" color="white--text">Lunas</v-chip></span>
                    <span v-else> <v-chip small label class="red" color="white--text">Belum Lunas</v-chip></span>
                </template>
                <template v-slot:[`item.tanggalWaktuKembali`]="{ item }">
                    <span v-if="item.tanggalWaktuKembali == null">Belum Kembali</span>
                </template>
                <template v-slot:[`item.actions`]="{ item }">    
                    <v-menu offset-y>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                            icon
                            dark
                            v-bind="attrs"
                            v-on="on"
                            color="black"
                            >
                            <v-icon>mdi-dots-vertical</v-icon>
                            </v-btn>
                        </template>
                        <v-card width="250">
                            <v-btn block outlined color="blue darken-4" class=" white--text" small @click="detailHandler(item, 'Detail')" > Detail Transaksi </v-btn>
                        </v-card>
                    </v-menu>
                </template>
            </v-data-table>

             <v-data-table v-if="showDiterima" :headers="headers" :items="diterimaTransaksi" :search="search2" >
                <template v-slot:[`item.statusTransaksi`]="{ item }">
                    <span v-if="item.statusTransaksi == 'Diterima'" > <v-chip small label class="green" color="white--text">Diterima</v-chip></span>
                </template>
                <template v-slot:[`item.statusPembayaran`]="{ item }">
                    <span v-if="item.statusPembayaran == 1" > <v-chip small label class="green" color="white--text">Lunas</v-chip></span>
                    <span v-else> <v-chip small label class="red" color="white--text">Belum Lunas</v-chip></span>
                </template>
                <template v-slot:[`item.tanggalWaktuKembali`]="{ item }">
                    <span v-if="item.tanggalWaktuKembali == null">Belum Kembali</span>
                </template>
                <template v-slot:[`item.actions`]="{ item }">    
                    <v-menu offset-y>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                            icon
                            dark
                            v-bind="attrs"
                            v-on="on"
                            color="black"
                            >
                            <v-icon>mdi-dots-vertical</v-icon>
                            </v-btn>
                        </template>
                         <v-card width="250">
                            <v-btn block outlined color="blue darken-4" class=" white--text" small @click="detailHandler(item, 'Detail')" > Detail Transaksi </v-btn>
                        </v-card>
                    </v-menu>
                </template>
            </v-data-table>

            <v-data-table v-if="showInProgress" :headers="headers" :items="inTransaksi" :search="search3" >
                <template v-slot:[`item.statusTransaksi`]="{ item }">
                    <span v-if="item.statusTransaksi == 'Peminjaman Berlangsung'" > <v-chip small label class="blue darken-4" color="white--text">Peminjaman Berlangsung</v-chip></span>
                </template>
                <template v-slot:[`item.statusPembayaran`]="{ item }">
                    <span v-if="item.statusPembayaran == 1" > <v-chip small label class="green" color="white--text">Lunas</v-chip></span>
                    <span v-else> <v-chip small label class="red" color="white--text">Belum Lunas</v-chip></span>
                </template>
                <template v-slot:[`item.tanggalWaktuKembali`]="{ item }">
                    <span v-if="item.tanggalWaktuKembali == null">Belum Kembali</span>
                     <span v-else-if="item.tanggalWaktuKembali != null">{{ item.tanggalWaktuKembali }}</span>
                </template>
                <template v-slot:[`item.actions`]="{ item }">    
                    <v-menu offset-y>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                            icon
                            dark
                            v-bind="attrs"
                            v-on="on"
                            color="black"
                            >
                            <v-icon>mdi-dots-vertical</v-icon>
                            </v-btn>
                        </template>
                        <v-card width="250">
                            <v-btn block outlined color="blue darken-4" class=" white--text" small @click="detailHandler(item, 'Detail')" > Detail Transaksi </v-btn>
                            <v-btn block class="blue lighten-1 white--text" small @click="detailHandler(item, 'Kembali')" > Mobil Kembali </v-btn>
                            <v-btn block class="blue darken-3 white--text" small @click="detailHandler(item, 'Status')" > Ubah Status Pembayaran </v-btn>
                            <v-btn block class="green darken-2 white--text" small @click="detailHandler(item, 'Selesai')" > Transaksi Selesai </v-btn>
                        </v-card>
                    </v-menu>
                </template>
            </v-data-table>

            <v-data-table v-if="showSelesai" :headers="headers" :items="selesaiTransaksi" :search="search4" >
                <template v-slot:[`item.statusTransaksi`]="{ item }">
                    <span v-if="item.statusTransaksi == 'Selesai'" > <v-chip small label class="green" color="white--text">Selesai</v-chip></span>
                </template>
                <template v-slot:[`item.statusPembayaran`]="{ item }">
                    <span v-if="item.statusPembayaran == 1" > <v-chip small label class="green" color="white--text">Lunas</v-chip></span>
                    <span v-else> <v-chip small label class="red" color="white--text">Belum Lunas</v-chip></span>
                </template>
                 <template v-slot:[`item.tanggalWaktuKembali`]="{ item }">
                    <span v-if="item.tanggalWaktuKembali == null">Belum Kembali</span>
                     <span v-else-if="item.tanggalWaktuKembali != null">{{ item.tanggalWaktuKembali }}</span>
                </template>
                <template v-slot:[`item.actions`]="{ item }">    
                    <v-menu offset-y>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                            icon
                            dark
                            v-bind="attrs"
                            v-on="on"
                            color="black"
                            >
                            <v-icon>mdi-dots-vertical</v-icon>
                            </v-btn>
                        </template>
                       <v-card width="250">
                            <v-btn block outlined color="blue darken-4" class=" white--text" small @click="detailHandler(item, 'Detail')" > Detail Transaksi </v-btn>
                        </v-card>
                    </v-menu>
                </template>
            </v-data-table>

            <v-data-table v-if="showDitolak" :headers="headers" :items="ditolakTransaksi" :search="search5" >
                <template v-slot:[`item.statusTransaksi`]="{ item }">
                    <span v-if="item.statusTransaksi == 'Ditolak'" > <v-chip small label class="red" color="white--text">Ditolak</v-chip></span>
                    <span v-else-if="item.statusTransaksi == 'Transaksi Ditolak'" > <v-chip small label class="red darken-4" color="white--text">Transaksi Ditolak</v-chip></span>
                </template>
                <template v-slot:[`item.statusPembayaran`]="{ item }">
                    <span v-if="item.statusPembayaran == 1" > <v-chip small label class="green" color="white--text">Lunas</v-chip></span>
                    <span v-else> <v-chip small label class="red" color="white--text">Belum Lunas</v-chip></span>
                </template>
                 <template v-slot:[`item.tanggalWaktuKembali`]="{ item }">
                    <span v-if="item.tanggalWaktuKembali == null">Transaksi Batal</span>
                     <span v-else-if="item.tanggalWaktuKembali != null">{{ item.tanggalWaktuKembali }}</span>
                </template>
                <template v-slot:[`item.actions`]="{ item }">    
                    <v-menu offset-y>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                            icon
                            dark
                            v-bind="attrs"
                            v-on="on"
                            color="black"
                            >
                            <v-icon>mdi-dots-vertical</v-icon>
                            </v-btn>
                        </template>
                         <v-card width="250">
                            <v-btn block outlined color="blue darken-4" class=" white--text" small @click="detailHandler(item, 'Detail')" > Detail Transaksi </v-btn>
                        </v-card>
                    </v-menu>
                </template>
            </v-data-table>

             <v-data-table v-if="showBatal" :headers="headers" :items="batalTransaksi" :search="search6" >
                <template v-slot:[`item.statusTransaksi`]="{ item }">
                    <span v-if="item.statusTransaksi == 'Batal'" > <v-chip small label class="black" color="white--text">Batal</v-chip></span>
                </template>
                <template v-slot:[`item.statusPembayaran`]="{ item }">
                    <span v-if="item.statusPembayaran == 1" > <v-chip small label class="green" color="white--text">Lunas</v-chip></span>
                    <span v-else> <v-chip small label class="red" color="white--text">Belum Lunas</v-chip></span>
                </template>
                <template v-slot:[`item.tanggalWaktuKembali`]="{ item }">
                    <span v-if="item.tanggalWaktuKembali == null">Transaksi Batal</span>
                     <span v-else-if="item.tanggalWaktuKembali != null">{{ item.tanggalWaktuKembali }}</span>
                </template>
                <template v-slot:[`item.actions`]="{ item }">    
                    <v-menu offset-y>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                            icon
                            dark
                            v-bind="attrs"
                            v-on="on"
                            color="black"
                            >
                            <v-icon>mdi-dots-vertical</v-icon>
                            </v-btn>
                        </template>
                         <v-card width="250">
                            <v-btn block outlined color="blue darken-4" class=" white--text" small @click="detailHandler(item, 'Detail')" > Detail Transaksi </v-btn>
                        </v-card>
                    </v-menu>
                </template>
            </v-data-table>
        </v-card>

        <v-dialog v-model="dialog" persistent width="900">
            <v-card>
                <v-app-bar color="white--text" class="blue darken-4">
                    <span >Detail Transaksi Customer</span>
                    <v-spacer></v-spacer>
                    <v-btn outlined  color="white" v-if="this.detailForm.buktiTransfer != null" @click="dialogBukti = true">Bukti Transfer</v-btn>
                    <v-menu v-if="this.detailForm.statusTransaksi == 'Menunggu Konfirmasi'" offset-y>
                    <template v-slot:activator="{ on: menu}">   
                        <v-btn  v-on="menu" small elevation="8" plain outlined class="blue lighten-4 mr-5" color="black" >Ubah Status Transaksi </v-btn>
                    </template>
                    <v-card >
                       <v-btn block class="green white--text" @click="isDiterima" >Diterima</v-btn>
                       <v-btn block class="red white--text" @click="isDitolak">Ditolak</v-btn>
                    </v-card>
                </v-menu>
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn @click="dialog = !dialog" router v-bind="attrs" v-on="on" icon fab> 
                                <v-icon color="white">mdi-close-circle</v-icon>
                            </v-btn>
                        </template>
                        <span>Exit</span>
                    </v-tooltip>
                </v-app-bar>
                <br>
                <v-container>
                    <v-row dense no-gutters> 
                        <v-col lg="3" sm="3" md="3" xl="3">
                            <p class="text-left ml-5">No Transaksi</p>
                        </v-col>
                        <v-col lg="1" sm="1" md="1" xl="1">
                            <p class="text-left">:</p>
                        </v-col>
                        <v-col >
                            <p class="text-left">{{ this.detailForm.idTransaksi }}</p>
                        </v-col>
                    </v-row>
                    <v-row dense no-gutters> 
                       <v-col lg="3" sm="3" md="3" xl="3">
                            <p class="text-left ml-5">ID Customer</p>
                        </v-col>
                        <v-col lg="1" sm="1" md="1" xl="1">
                            <p class="text-left">:</p>
                        </v-col>
                        <v-col >
                            <p class="text-left">{{ this.detailForm.idCustomer }}</p>
                        </v-col>
                    </v-row>
                    <v-row dense no-gutters> 
                       <v-col lg="3" sm="3" md="3" xl="3">
                            <p class="text-left ml-5">Nama Customer</p>
                        </v-col>
                        <v-col lg="1" sm="1" md="1" xl="1">
                            <p class="text-left">:</p>
                        </v-col>
                        <v-col >
                            <p class="text-left">{{ this.detailForm.namaCustomer }}</p>
                        </v-col>
                    </v-row>
                     <v-row dense no-gutters> 
                       <v-col lg="3" sm="3" md="3" xl="3">
                            <p class="text-left ml-5">No. Telepon</p>
                        </v-col>
                        <v-col lg="1" sm="1" md="1" xl="1">
                            <p class="text-left">:</p>
                        </v-col>
                        <v-col >
                            <p class="text-left">{{ this.detailForm.noTelpCustomer }}</p>
                        </v-col>
                    </v-row>
                     <v-row dense no-gutters> 
                       <v-col lg="3" sm="3" md="3" xl="3">
                            <p class="text-left ml-5">Tanggal Transaksi</p>
                        </v-col>
                        <v-col lg="1" sm="1" md="1" xl="1">
                            <p class="text-left">:</p>
                        </v-col>
                        <v-col >
                            <p class="text-left">{{ this.detailForm.tanggalTransaksi }}</p>
                        </v-col>
                    </v-row>
                     <v-row dense no-gutters> 
                       <v-col lg="3" sm="3" md="3" xl="3">
                            <p class="text-left ml-5">Tanggal Sewa</p>
                        </v-col>
                        <v-col lg="1" sm="1" md="1" xl="1">
                            <p class="text-left">:</p>
                        </v-col>
                        <v-col >
                            <p class="text-left">{{ this.detailForm.tanggalWaktuSewa }}</p>
                        </v-col>
                    </v-row>
                     <v-row dense no-gutters> 
                       <v-col lg="3" sm="3" md="3" xl="3">
                            <p class="text-left ml-5">Tanggal Selesai</p>
                        </v-col>
                        <v-col lg="1" sm="1" md="1" xl="1">
                            <p class="text-left">:</p>
                        </v-col>
                        <v-col >
                            <p class="text-left">{{ this.detailForm.tanggalWaktuSelesai }}</p>
                        </v-col>
                    </v-row>
                     <v-row dense no-gutters> 
                       <v-col lg="3" sm="3" md="3" xl="3">
                            <p class="text-left ml-5">Tanggal Kembali</p>
                        </v-col>
                        <v-col lg="1" sm="1" md="1" xl="1">
                            <p class="text-left">:</p>
                        </v-col>
                        <v-col >
                            <p class="text-left">{{ this.detailForm.tanggalWaktuKembali }}</p>
                        </v-col>
                    </v-row>
                     <v-row dense no-gutters> 
                       <v-col lg="3" sm="3" md="3" xl="3">
                            <p class="text-left ml-5">Jenis Promo</p>
                        </v-col>
                        <v-col lg="1" sm="1" md="1" xl="1">
                            <p class="text-left">:</p>
                        </v-col>
                        <v-col >
                            <p class="text-left">{{ this.detailForm.jenisPromo }}</p>
                        </v-col>
                    </v-row>
                     <v-row dense no-gutters> 
                       <v-col lg="3" sm="3" md="3" xl="3">
                            <p class="text-left ml-5">Besar Promo</p>
                        </v-col>
                        <v-col lg="1" sm="1" md="1" xl="1">
                            <p class="text-left">:</p>
                        </v-col>
                        <v-col >
                            <p class="text-left">{{ this.detailForm.besarPromo * 100 }}%</p>
                        </v-col>
                    </v-row>
                     <v-row dense no-gutters> 
                       <v-col lg="3" sm="3" md="3" xl="3">
                            <p class="text-left ml-5">Nama Mobil</p>
                        </v-col>
                        <v-col lg="1" sm="1" md="1" xl="1">
                            <p class="text-left">:</p>
                        </v-col>
                        <v-col >
                            <p class="text-left">{{ this.detailForm.namaMobil }}</p>
                        </v-col>
                    </v-row>
                     <v-row dense no-gutters> 
                       <v-col lg="3" sm="3" md="3" xl="3">
                            <p class="text-left ml-5">Plat Nomor</p>
                        </v-col>
                        <v-col lg="1" sm="1" md="1" xl="1">
                            <p class="text-left">:</p>
                        </v-col>
                        <v-col >
                            <p class="text-left">{{ this.detailForm.platNomor }}</p>
                        </v-col>
                    </v-row>
                     <v-row dense no-gutters> 
                       <v-col lg="3" sm="3" md="3" xl="3">
                            <p class="text-left ml-5">Nama Driver</p>
                        </v-col>
                        <v-col lg="1" sm="1" md="1" xl="1">
                            <p class="text-left">:</p>
                        </v-col>
                        <v-col >
                            <p class="text-left">{{ this.detailForm.namaDriver }}</p>
                        </v-col>
                    </v-row>
                     <v-row dense no-gutters> 
                       <v-col lg="3" sm="3" md="3" xl="3">
                            <p class="text-left ml-5">Rate Driver</p>
                        </v-col>
                        <v-col lg="1" sm="1" md="1" xl="1">
                            <p class="text-left">:</p>
                        </v-col>
                        <v-col >
                            <p class="text-left">{{ this.detailForm.rateDriver }}</p>
                        </v-col>
                    </v-row>
                     <v-row dense no-gutters> 
                       <v-col lg="3" sm="3" md="3" xl="3">
                            <p class="text-left ml-5">Performa Driver</p>
                        </v-col>
                        <v-col lg="1" sm="1" md="1" xl="1">
                            <p class="text-left">:</p>
                        </v-col>
                        <v-col >
                            <p class="text-left">{{ this.detailForm.performaDriver }}</p>
                        </v-col>
                    </v-row>
                     <v-row dense no-gutters> 
                       <v-col lg="3" sm="3" md="3" xl="3">
                            <p class="text-left ml-5">Metode Pembayaran</p>
                        </v-col>
                        <v-col lg="1" sm="1" md="1" xl="1">
                            <p class="text-left">:</p>
                        </v-col>
                        <v-col >
                            <p class="text-left">{{ this.detailForm.metodePembayaran }}</p>
                        </v-col>
                    </v-row>
                     <v-row dense no-gutters> 
                       <v-col lg="3" sm="3" md="3" xl="3">
                            <p class="text-left ml-5">Total Promo</p>
                        </v-col>
                        <v-col lg="1" sm="1" md="1" xl="1">
                            <p class="text-left">:</p>
                        </v-col>
                        <v-col >
                            <p class="text-left">Rp {{ this.detailForm.totalPromo }},00</p>
                        </v-col>
                    </v-row>
                     <v-row dense no-gutters> 
                       <v-col lg="3" sm="3" md="3" xl="3">
                            <p class="text-left ml-5">Total Biaya Mobil</p>
                        </v-col>
                        <v-col lg="1" sm="1" md="1" xl="1">
                            <p class="text-left">:</p>
                        </v-col>
                        <v-col >
                            <p class="text-left">Rp {{ this.detailForm.totalBiayaMobil }},00</p>
                        </v-col>
                    </v-row>
                    <v-row dense no-gutters> 
                       <v-col lg="3" sm="3" md="3" xl="3">
                            <p class="text-left ml-5">Total Biaya Driver</p>
                        </v-col>
                        <v-col lg="1" sm="1" md="1" xl="1">
                            <p class="text-left">:</p>
                        </v-col>
                        <v-col >
                            <p class="text-left">Rp {{ this.detailForm.totalBiayaDriver }},00</p>
                        </v-col>
                    </v-row>
                    <v-row dense no-gutters> 
                       <v-col lg="3" sm="3" md="3" xl="3">
                            <p class="text-left ml-5">Denda Peminjaman</p>
                        </v-col>
                        <v-col lg="1" sm="1" md="1" xl="1">
                            <p class="text-left">:</p>
                        </v-col>
                        <v-col >
                            <p class="text-left">Rp {{ this.detailForm.dendaPeminjaman }},00</p>
                        </v-col>
                    </v-row>
                    <v-row dense no-gutters> 
                       <v-col lg="3" sm="3" md="3" xl="3">
                            <p class="text-left ml-5">Total Biaya </p>
                        </v-col>
                        <v-col lg="1" sm="1" md="1" xl="1">
                            <p class="text-left">:</p>
                        </v-col>
                        <v-col >
                            <p class="text-left">Rp {{ this.detailForm.totalBiaya }},00</p>
                        </v-col>
                    </v-row>
                    <v-row dense no-gutters> 
                       <v-col lg="3" sm="3" md="3" xl="3">
                            <p class="text-left ml-5">Status Pembayaran </p>
                        </v-col>
                        <v-col lg="1" sm="1" md="1" xl="1">
                            <p class="text-left">:</p>
                        </v-col>
                        <v-chip v-if="this.detailForm.statusPembayaran == 0" class="red white--text">
                            Belum Lunas
                        </v-chip>
                        <v-chip v-else class="green white--text">
                            Lunas
                        </v-chip>
                    </v-row>
                    <v-row dense no-gutters> 
                       <v-col lg="3" sm="3" md="3" xl="3">
                            <p class="text-left ml-5">Status Transaksi </p>
                        </v-col>
                        <v-col lg="1" sm="1" md="1" xl="1">
                            <p class="text-left">:</p>
                        </v-col>
                        <v-chip v-if="this.detailForm.statusTransaksi == 'Menunggu Konfirmasi'" class="grey white--text">
                            {{ this.detailForm.statusTransaksi }}
                        </v-chip>
                        <v-chip v-else-if="this.detailForm.statusTransaksi == 'Diterima'" class="green white--text">
                            {{ this.detailForm.statusTransaksi }}
                        </v-chip>
                        <v-chip v-else-if="this.detailForm.statusTransaksi == 'Peminjaman Berlangsung'" class="blue darken-4 white--text">
                            {{ this.detailForm.statusTransaksi }}
                        </v-chip>
                        <v-chip v-else-if="this.detailForm.statusTransaksi == 'Ditolak'" class="red white--text">
                            {{ this.detailForm.statusTransaksi }}
                        </v-chip>
                        <v-chip v-else-if="this.detailForm.statusTransaksi == 'Transaksi Ditolak'" class="red white--text">
                            {{ this.detailForm.statusTransaksi }}
                        </v-chip>
                        <v-chip v-else-if="this.detailForm.statusTransaksi == 'Selesai'" class="green white--text">
                            {{ this.detailForm.statusTransaksi }}
                        </v-chip>
                        <v-chip v-else-if="this.detailForm.statusTransaksi == 'Batal'" class="black white--text">
                            {{ this.detailForm.statusTransaksi }}
                        </v-chip>
                    </v-row>
                </v-container>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogSelesai" persistent max-width="600" >
            <v-card>
                 <v-toolbar color="white--text" class="blue darken-4" flat>
                    <span  class="headline">Peminjaman Selesai</span>
                </v-toolbar>
                <v-form ref="form">
                <v-card-text>
                    <v-container>
                        <v-form ref="form">
                            <div>
                                <v-menu
                                ref="menu"
                                v-model="menu2"
                                :close-on-content-click="false"
                                transition="scale-transition"
                                offset-y
                                min-width="auto"
                                >
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                    outlined
                                    dense
                                    rounded
                                    v-model="tanggalSelesai"
                                    label="Tanggal Selesai Sewa"
                                    prepend-icon="mdi-calendar"
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                                    :rules="rules.null"
                                    ></v-text-field>
                                </template>
                                <v-date-picker
                                    v-model="tanggalSelesai"
                                    :active-picker.sync="activePicker"
                                    :min="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
                                ></v-date-picker>
                                </v-menu>
                            </div>
                            <div>
                                <v-menu
                                ref="menu"
                                v-model="menu"
                                :close-on-content-click="false"
                                transition="scale-transition"
                                offset-y
                                min-width="auto"
                                >
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                    outlined
                                    dense
                                    rounded
                                    v-model="waktuSelesai"
                                    label="Waktu Kembali"
                                    prepend-icon="mdi-clock"
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                                    :rules="rules.null"
                                    ></v-text-field>
                                </template>
                             <v-time-picker
                                v-model="waktuSelesai"
                                format="24hr"
                            >
                            </v-time-picker>
                            </v-menu>
                            </div>
                            <v-text-field
                                dense
                                outlined
                                rounded
                                v-model="dendaTambahan"
                                label="Denda Kerusakan"
                                :rules="rules.null"
                            >
                            </v-text-field>
                        </v-form>
                    </v-container>
                </v-card-text>
                </v-form>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialogSelesai = !dialogSelesai"> Cancel </v-btn>
                    <v-btn color="green darken-1" text @click="updateTransaksiHandler" > Konfirmasi </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogKonfirmasi" width="500">
            <v-card elevation="10" width="auto" height="auto">
                <v-toolbar color="white--text" class="yellow darken-3">
                    <span  class="headline">Konfirmasi Pelunasan</span>
                </v-toolbar>
                <h4 class="mt-5" >Pastikan Customer telah membayar / mengupload bukti transfer</h4>
                <br>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialogKonfirmasi = !dialogKonfirmasi"> Cancel </v-btn>
                    <v-btn color="blue darken-1" text @click="ubahStatusPembayaran()"> OK </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogKonfirmasi2" width="500">
            <v-card elevation="10" width="auto" height="auto">
                <v-toolbar color="white--text" class="yellow darken-3">
                    <span  class="headline">Transaksi Telah Selesai?</span>
                </v-toolbar>
                <h4 class="mt-5" >Pastikan seluruh proses transaksi telah selesai. Mobil telah kembali dan Pembayaran telah lunas</h4>
                <br>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialogKonfirmasi2 = !dialogKonfirmasi2"> Cancel </v-btn>
                    <v-btn color="blue darken-1" text @click="editStatusTransaksi()"> OK </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogBukti" width="700">
            <v-card elevation="10" width="auto" height="auto">
                <v-toolbar color="white--text" class="blue darken-4">
                    <span  class="headline">Bukti Transfer</span>
                    <v-spacer></v-spacer>
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn @click="dialogBukti = !dialogBukti" router v-bind="attrs" v-on="on" icon fab> 
                                <v-icon color="white">mdi-close-circle</v-icon>
                            </v-btn>
                        </template>
                        <span>Exit</span>
                    </v-tooltip>
                </v-toolbar>
                 <v-img v-if="this.detailForm.buktiTransfer != null" :src="$baseUrl+'/storage/'+this.detailForm.buktiTransfer" max-height="1000" max-width="700" class=""></v-img>
                <br>
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


        </div>

    </v-main>
</template>

<script>
export default {
    name: 'TransaksiChecks',
    data() {
        return{
            biayaKotor: null,
            menu2: null,
            menu: null,
            dendaTambahan : null,
            waktuSelesai : null,
            tanggalSelesai : null,
            statusTransaksi: null,
            snackbar: false,
            snackbar2: false,
            success_message: null,
            error_message: null,
            dialog: false,
            dialogSelesai: false,
            dialogKonfirmasi: false,
            dialogKonfirmasi2: false,
            dialogBukti: false,
            editId: null,
            showDiterima: false,
            showInProgress: false,
            showBatal: false,
            showDitolak: false,
            showSelesai: false,
            showBaru : false,
            search1: null,
            search2: null,
            search3: null,
            search4: null,
            search5: null,
            search6: null,
            load: true,
            isOpen: false,
            newTransaksi : [],
            ditolakTransaksi : [],
            batalTransaksi : [],
            diterimaTransaksi : [],
            inTransaksi : [],
            selesaiTransaksi : [],
            dendaBiayaMobil: 0,
            dendaBiayaDriver: 0,
            headers:[
                {
                    text: "No Transaksi",
                    align: "start",
                    sortable: true,
                    value: "idTransaksi",
                },
                { text: "No Customer", value: "idCustomer" },
                { text: "Nama Customer", value: "namaCustomer" },
                { text: "No.Telepon", value: "noTelpCustomer"},
                { text: "Tanggal Kembali", value: "tanggalWaktuKembali"},
                { text: "Status Pembayaran", value: "statusPembayaran" },
                { text: "Status Transaksi", value: "statusTransaksi" },
                { text: "Actions", value: "actions"},
            ],
            detailForm:{
                idTransaksi : null,
                idCustomer : null,
                idMobil : null,
                idDriver : null,
                idPegawai : null,
                idPembayaran : null,
                namaCustomer : null,
                noTelpCustomer : null,
                namaDriver : null,
                tanggalTransaksi : null,
                tanggalWaktuSewa : null,
                tanggalWaktuSelesai : null,
                tanggalWaktuKembali : null,
                rateDriver : null,
                performaDriver : null,
                jenisPromo : null,
                besarPromo : null,
                namaMobil : null,
                platNomor: null,
                statusKetersediaanMobil: null,
                metodePembayaran : null,
                totalPromo : null,
                totalBiayaMobil : null,
                totalBiayaDriver : null,
                dendaPeminjaman : null,
                totalBiaya : null,
                statusPembayaran : null,
                statusTransaksi: null,
                hargaSewaDriver : null,
                hargaSewaMobil : null,
                buktiTransfer : null,
            },
            formBiaya: {
                totalPromo : null,
                dendaPeminjaman : null,
                totalBiayaDriver : null,
                totalBiayaMobil : null,
                totalBiaya : null,
            },
            namaPegawai : null,
            rules: {
                null: 
                    [val => !!val|| 'This field is required'],
            },
        }
    },

    methods: {
        isDiterima(){
            this.statusTransaksi = 'Diterima';
            this.editStatus();
        },
        isDitolak(){
            this.statusTransaksi = 'Ditolak';
            this.editStatus();
        },
        async showTransaksiMenungguKonfirmasi(){
            var url = this.$api + '/showMenungguKonfirmasi/transaksi';
            await this.$http.get(url, {
                  headers: {
                      'Authorization' : 'Bearer ' + sessionStorage.getItem('token')
                  }
            }).then(response => {
                if(response.data.data == null){
                    this.newTransaksi = []
                }else{
                    this.newTransaksi = response.data.data;
                }
            })
        },
        async showTransaksiDiterima(){
            var url = this.$api + '/showForCS/transaksi/' + 'Diterima';
            await this.$http.get(url, {
                  headers: {
                      'Authorization' : 'Bearer ' + sessionStorage.getItem('token')
                  }
            }).then(response => {
                if(response.data.data == null){
                    this.diterimaTransaksi = []
                }else{
                    this.diterimaTransaksi = response.data.data;
                }
            })
        },
        async showTransaksiSelesai(){
            var url = this.$api + '/showForCS/transaksi/' + 'Selesai';
            await this.$http.get(url, {
                  headers: {
                      'Authorization' : 'Bearer ' + sessionStorage.getItem('token')
                  }
            }).then(response => {
                if(response.data.data == null){
                    this.selesaiTransaksi = []
                }else{
                    this.selesaiTransaksi = response.data.data;
                }
            })
        },
        async showTransaksiBatal(){
            var url = this.$api + '/showForCS/transaksi/' + 'Batal';
            await this.$http.get(url, {
                  headers: {
                      'Authorization' : 'Bearer ' + sessionStorage.getItem('token')
                  }
            }).then(response => {
                if(response.data.data == null){
                    this.batalTransaksi = []
                }else{
                    this.batalTransaksi = response.data.data;
                }
            })
        },
        async showTransaksiInProgress(){
            var url = this.$api + '/showForCS/transaksi/' + 'Peminjaman Berlangsung';
            await this.$http.get(url, {
                  headers: {
                      'Authorization' : 'Bearer ' + sessionStorage.getItem('token')
                  }
            }).then(response => {
                if(response.data.data == null){
                    this.inTransaksi = []
                }else{
                    this.inTransaksi = response.data.data;
                }
            })
        },
        async showTransaksiDitolak(){
            var url = this.$api + '/showDitolak/transaksi';
            await this.$http.get(url, {
                  headers: {
                      'Authorization' : 'Bearer ' + sessionStorage.getItem('token')
                  }
            }).then(response => {
                if(response.data.data == null){
                    this.ditolakTransaksi = []
                }else{
                    this.ditolakTransaksi = response.data.data;
                }
            })
        },
        handler1(){
            this.showDiterima= false;
            this.showInProgress= false;
            this.showBatal= false;
            this.showDitolak= false;
            this.showSelesai= false;
            this.showBaru = true;
        },
        handler2(){
            this.showDiterima= true;
            this.showInProgress= false;
            this.showBatal= false;
            this.showDitolak= false;
            this.showSelesai= false;
            this.showBaru = false;
        },
        handler3(){
            this.showDiterima= false;
            this.showInProgress= true;
            this.showBatal= false;
            this.showDitolak= false;
            this.showSelesai= false;
            this.showBaru = false;
        },
        handler4(){
            this.showDiterima= false;
            this.showInProgress= false;
            this.showBatal= false;
            this.showDitolak= false;
            this.showSelesai= true;
            this.showBaru = false;
        },
        handler5(){
            this.showDiterima= false;
            this.showInProgress= false;
            this.showBatal= false;
            this.showDitolak= true;
            this.showSelesai= false;
            this.showBaru = false;
        },
        handler6(){
            this.showDiterima= false;
            this.showInProgress= false;
            this.showBatal= true;
            this.showDitolak= false;
            this.showSelesai= false;
            this.showBaru = false;
        },
        editStatus(){
            let newData = {
                statusTransaksi : this.statusTransaksi,
                idPegawai : sessionStorage.getItem('id')
            };
            var url = this.$api + '/updateStatusFirstTime/transaksi/' + this.editId;
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
                if(this.statusTransaksi == 'Diterima'){
                    this.editStatusMobil();
                }else{
                    location.reload();
                }
            }).catch(error => {
                this.error_message = error.response.data.message;
                this.color = "red";
                this.snackbar = true;
                this.load = false;
            });
        },
        editStatusTransaksi(){
            let newData = {
                statusTransaksi : "Selesai"
            };
            var url = this.$api + '/updateStatus/transaksi/' + this.editId;
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
                location.reload();
            }).catch(error => {
                this.error_message = error.response.data.message;
                this.color = "red";
                this.snackbar = true;
                this.load = false;
            });
        },
        editStatusMobil(){
            let newData = {
                statusKetersediaanMobil : !this.detailForm.statusKetersediaanMobil
            };
            var url = this.$api + '/updateStatus/mobil/' + this.detailForm.idMobil;
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
        updateTransaksiHandler(){
            if(this.waktuSelesai == null){
                this.success_message = 'Waktu Selesai Tidak Boleh Kosong';
                this.color = "red";
                this.snackbar2 = true;
            }else if(this.tanggalSelesai == null ){
                this.success_message = 'Tanggal Kembali Tidak Boleh Kosong';
                this.color = "red";
                this.snackbar2 = true;
            }else if(this.dendaTambahan == null ){
                this.success_message = 'Denda Tambahan Tidak Boleh Kosong';
                this.color = "red";
                this.snackbar2 = true;
            }else{
                var dateTime = this.tanggalSelesai + " " + this.waktuSelesai;
                var date = this.$moment(String(dateTime)).format('YYYY-MM-DD');
                var time = this.$moment(String(dateTime)).format('HH:mm:ss');
                var sewaSelesai = new Date(this.detailForm.tanggalWaktuSelesai).addHours(12);
                var dateSelesai = this.$moment(String(sewaSelesai)).format('YYYY-MM-DD');
                var timeSelesai = this.$moment(String(sewaSelesai)).format('HH:mm:ss');
                if(date > dateSelesai){
                    const _MS_PER_DAY = 1000*60*60*24;
                    var diff = (Date.parse(date) - Date.parse(dateSelesai)) / _MS_PER_DAY;
                    if(time > timeSelesai){
                        diff = diff + 1;
                    }
                    this.dendaBiayaMobil = this.detailForm.hargaSewaMobil * diff;
                    this.dendaBiayaDriver = this.detailForm.hargaSewaDriver * diff;
                }
                this.formBiaya.dendaPeminjaman = this.dendaBiayaMobil + this.dendaBiayaDriver +  parseInt(this.dendaTambahan);
                this.formBiaya.totalBiayaDriver = this.detailForm.totalBiayaDriver + this.dendaBiayaDriver;
                this.formBiaya.totalBiayaMobil = this.detailForm.totalBiayaMobil + this.dendaBiayaMobil;
                this.biayaKotor = this.formBiaya.totalBiayaDriver + this.formBiaya.totalBiayaMobil + this.formBiaya.dendaPeminjaman;
                if(this.detailForm.besarPromo != 0){
                    this.formBiaya.totalPromo = this.biayaKotor * this.detailForm.besarPromo;
                }else{
                    this.formBiaya.totalPromo = 0;
                }
                this.formBiaya.totalBiaya = this.biayaKotor - this.formBiaya.totalPromo;
                this.updatePembayaran()
            }
        },
        async updatePembayaran(){
            var url = this.$api + '/updateBiaya/pembayaran/' + this.detailForm.idPembayaran;
            await this.$http.put(url, this.formBiaya, {
                  headers: {
                      'Authorization' : 'Bearer ' + sessionStorage.getItem('token')
                  }
            }).then(response => {
                this.success_message = response.data.message;
                this.updateTransaksi();
            })
        },
        async updateTransaksi(){ 
            if(this.$refs.form.validate()){
                let dateTime = this.tanggalSelesai + " " + this.waktuSelesai;
                let newData = {
                    idPegawai : this.detailForm.idPegawai,
                    idCustomer : this.detailForm.idCustomer,
                    idPembayaran : this.detailForm.idPembayaran,
                    idDriver : this.detailForm.idDriver,
                    tanggalWaktuSelesai : this.detailForm.tanggalWaktuSelesai,
                    tanggalWaktuSewa : this.detailForm.tanggalWaktuSewa,
                    tanggalWaktuKembali : dateTime,
    
                }
                var url = this.$api + '/update/transaksi/' + this.editId;
                await this.$http.put(url, newData, {
                      headers: {
                          'Authorization' : 'Bearer ' + sessionStorage.getItem('token')
                      }
                }).then(response => {
                    this.success_message = response.data.message;
                    this.snackbar2 = true;
                    this.color = 'green';
                    this.editStatusMobil()
                }).catch(error => {
                    this.error_message = error.response.data.message;
                    this.color = "red";
                    this.snackbar = true;
                });
            }
        },
        async ubahStatusPembayaran(){
            let newData = {
                statusPembayaran : !this.detailForm.statusPembayaran,
            };
            var url = this.$api + '/updateStatus/pembayaran/' + this.detailForm.idPembayaran;
            this.load = true;
            await this.$http.put(url, newData, {
                headers: {
                    'Authorization' : 'Bearer ' + sessionStorage.getItem('token')
                }
            }).then(response => {
                this.success_message = response.data.message;
                this.color = "green";
                this.snackbar2 = true;
                this.load = false;
                location.reload()
            }).catch(error => {
                this.error_message = error.response.data.message;
                this.color = "red";
                this.snackbar = true;
                this.load = false;
            });
        },
        detailHandler(item, status){
            this.editId = item.idTransaksi;
            this.detailForm.idCustomer = item.idCustomer;
            this.detailForm.idDriver = item.idDriver;
            this.detailForm.idMobil = item.idMobil;
            this.detailForm.idTransaksi = item.idTransaksi;
            this.detailForm.idPembayaran = item.idPembayaran;
            this.detailForm.namaCustomer = item.namaCustomer;
            this.detailForm.noTelpCustomer = item.noTelpCustomer;
            this.detailForm.tanggalTransaksi = item.tanggalTransaksi;
            this.detailForm.tanggalWaktuSewa = item.tanggalWaktuSewa
            this.detailForm.tanggalWaktuSelesai = item.tanggalWaktuSelesai;
            if(item.tanggalWaktuKembali != null){
                this.detailForm.tanggalWaktuKembali = item.tanggalWaktuKembali;
            }else{
                this.detailForm.tanggalWaktuKembali = 'Belum Kembali';
            }
            if(item.idDriver != null){
                this.detailForm.namaDriver = item.namaDriver;
                this.detailForm.hargaSewaDriver = item.hargaSewaDriver;
            }else{
                this.detailForm.namaDriver = 'Tidak Menggunakan Driver';
                this.detailForm.biayaSewaDriver = 0;
            }
            if(item.idPegawai != null){
                this.detailForm.idPegawai = item.idPegawai;
            }else{
                this.detailForm.idPegawai = null;
            }
            if(item.idPromo != null){
                this.detailForm.jenisPromo = item.jenisPromo;
                this.detailForm.besarPromo = item.besarPromo;
            }else{
                this.detailForm.jenisPromo = 'Tidak Menggunakan Promo';
                this.detailForm.besarPromo = 0;
            }
            if(item.rateDriver != null){
                this.detailForm.rateDriver = item.rateDriver;
                this.detailForm.performaDriver = item.performaDriver;
            }else{
                this.detailForm.rateDriver = 'Belum Memberi Rating';
                this.detailForm.performaDriver = 'Belum Memberi Ulasan';
            }
            this.detailForm.namaMobil = item.namaMobil;
            this.detailForm.platNomor = item.platNomor;
            this.detailForm.statusKetersediaanMobil = item.statusKetersediaanMobil;
            this.detailForm.hargaSewaMobil = item.hargaSewaMobil;
            this.detailForm.metodePembayaran = item.metodePembayaran;
            this.detailForm.totalPromo = item.totalPromo;
            this.detailForm.totalBiayaDriver = item.totalBiayaDriver;
            this.detailForm.totalBiayaMobil = item.totalBiayaMobil;
            this.detailForm.totalBiaya = item.totalBiaya;
            this.detailForm.dendaPeminjaman = item.dendaPeminjaman;
            this.detailForm.statusPembayaran = item.statusPembayaran;
            this.detailForm.statusTransaksi = item.statusTransaksi;
            this.detailForm.buktiTransfer = item.buktiTransfer;
            if(status == 'Detail'){
                this.dialog = !this.dialog;
            }else if(status == 'Kembali'){
                this.dialogSelesai = !this.dialogSelesai;
            }else if(status == 'Status'){
                if(this.detailForm.tanggalWaktuKembali == 'Belum Kembali'){
                    this.success_message = 'Mobil Belum Kembali';
                    this.color = "red";
                    this.snackbar2 = true;
                }else{
                    this.dialogKonfirmasi = !this.dialogKonfirmasi;
                }
            }else{
                if(this.detailForm.statusPembayaran == 1){
                    this.dialogKonfirmasi2 = !this.dialogKonfirmasi2;
                }else{
                    this.success_message = 'Transaksi Belum Lunas';
                    this.color = "red";
                    this.snackbar2 = true;
                }
            }
        },
        close(){
            this.dialog = false;
        },
    },

    computed: {
        formTitle(){
            return this.inputType;
        },
    },

    async mounted() {
        await this.showTransaksiMenungguKonfirmasi();
        await this.showTransaksiDiterima();
        await this.showTransaksiInProgress();
        await this.showTransaksiSelesai();
        await this.showTransaksiBatal();
        await this.showTransaksiDitolak();
        this.load = false;
        this.showBaru = true;
        this.isOpen = true;
    }
}
</script>

<style scoped>
.bg{
    background: url('../../assets/AJR_opacity.png') no-repeat center ;
    background-size: 100vh;
    height: 100vh;
}

</style>