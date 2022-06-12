<template>

<v-app>

    <v-main class="landingpage">

        <v-app-bar fixed hide-on-scroll elevation="15" class="blue darken-4">
            <v-btn fab class="blue darken-4">
                <v-avatar @click="toHome()">
                    <v-img :src="AJRlogo"></v-img>
                </v-avatar>
            </v-btn>
            <router-link to="/Beranda" style="text-decoration: none;">
                <h3 class="ml-5" style="color: #FFFFFF;"> ATMA JOGJA RENTAL </h3>
            </router-link>
            <v-spacer></v-spacer>
            <v-toolbar-items class="hidden-xs-only hidden-sm-only">
                <router-link to="/beranda" style="cursor:pointer">
                    <button class="buttonapp" type="button">
                        Beranda
                    </button>
                </router-link>
                <v-divider vertical></v-divider>
                <v-divider vertical></v-divider>
                <router-link to="/transaksi" style="cursor:pointer">
                    <button class="buttonapp" type="button">
                        Transaksi
                    </button>
                </router-link>
            </v-toolbar-items>   
                <v-menu offset-y>
                    <template v-slot:activator="{ on: menu}">
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on : tooltip}">
                            <v-btn
                            class="ml-10"
                            color="white"
                            v-on="{...tooltip, ...menu}"
                            fab 
                            small
                            >
                            <v-icon>mdi-dots-vertical</v-icon>
                            </v-btn>
                            </template>
                            <span>Settings</span>
                        </v-tooltip>
                    </template>
                    <v-card class="blue lighten-5" elevation="10" height="auto" width="320" max-width="600">
                        <v-container fluid>
                            <v-toolbar class="blue darken-4">
                                <v-row>
                                    <v-col align-self="center" cols="2">
                                        <v-avatar size="50">
                                            <v-img :src="personIcon"></v-img>
                                        </v-avatar>
                                    </v-col>
                                    <v-col align-self="start">
                                        <v-card-title class="justify-left white--text">{{ customerName }}</v-card-title>
                                    </v-col>
                                </v-row>
                            </v-toolbar>
                            <v-divider></v-divider>
                            <v-divider></v-divider>
                            <v-row>
                                <v-col cols="12">
                                    <v-list>
                                        <v-list-item-group>
                                            <router-link v-show="breakPointMobile" style="text-decoration: none;" to="/Transaksi">
                                                <v-list-item>
                                                    <h5 class="text-left black--text">Riwayat Transaksi</h5>
                                                </v-list-item>
                                            </router-link>
                                            <router-link style="text-decoration: none;" to="/Profil">
                                                <v-list-item>
                                                    <h5 class="text-left black--text">Profil</h5>
                                                </v-list-item>
                                            </router-link>
                                            <router-link style="text-decoration: none;" to="/UbahEmail">
                                                <v-list-item>
                                                    <h5 class="text-left black--text">Ubah Email</h5>
                                                </v-list-item>
                                            </router-link>
                                            <router-link style="text-decoration: none;" to="/UbahPassword">
                                                <v-list-item>
                                                    <h5 class="text-left black--text">Ubah Password</h5>
                                                </v-list-item>
                                            </router-link>
                                            <v-list-item @click="dialogRateHandler" >
                                                <h5 class="text-left">Rate AJR</h5>
                                            </v-list-item>
                                            <v-list-item @click="logout" >
                                                <h5 class="text-left red--text">Logout</h5>
                                            </v-list-item>
                                        </v-list-item-group>
                                    </v-list>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card>
                </v-menu>
        </v-app-bar>
        
        <v-dialog persistent width="500" v-model="dialogRate">
            <v-card width="auto" height="auto">
                <v-toolbar class="white--text" color="blue darken-4">
                    <v-card-title>
                        Rate AJR
                    </v-card-title>
                </v-toolbar>
                <p style="margin:20px;">Bagaimana dengan fasilitas layanan kami? Berilah rating dan ulasan agar kami dapat menjadi lebih baik.</p>
                <v-rating v-model="rate" background-color="yellow darken-2" color="yellow darken-2"></v-rating>
                <v-text-field
                style="margin:20px;"
                    dense
                    outlined
                    v-model="ulasan"
                    label="Ulasan"
                    :rules="rules.null"
                >
                </v-text-field>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="dialogRate = !dialogRate"> Cancel </v-btn>
                    <v-btn color="blue darken-1" text @click="submit"> Submit </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-content>
        <router-view></router-view>
        </v-content>    

        <v-snackbar v-model="snackbar2" :color="color" timeout="3000" bottom >{{ success_message }}</v-snackbar>

    </v-main>
</v-app>
</template>

<script>
import  image from "../../assets/AJR.png"
import  personImg from "../../assets/personIcon.png"

export default {
    name : "LandingPage",
    data() {
        return{
            rate: null,
            ulasan:null,
            customerName: sessionStorage.getItem('name'),
            setting: false,
            snackbar2: false,
            success_message: null,
            color: null,
            dialog: false,
            dialogRate: false,
            sidebar: false,
            AJRlogo : image,
            personIcon : personImg,
            items: [
                {icon: "mdi-home-circle", title: "Beranda", to: "/beranda"},
                {icon: "mdi-notebook", title: "Transaksi", to: "/transaksi"},
            ],
            rules: {
                null: 
                    [val => !!val  || 'This field is required'],
            },
        }
    },

    computed:{
        breakPointMobile(){
            if(this.$vuetify.breakpoint.width <= 960){
                return true
            }else{
                return false
            }
        },
    },

    methods : {
        toHome(){
            this.$router.push({
                name: 'Beranda',
            });
        },
        logout(){
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("id");
            sessionStorage.removeItem("role");
            sessionStorage.removeItem("name");
            sessionStorage.removeItem("tanggalLahir");
            sessionStorage.removeItem("KP");
            sessionStorage.removeItem("SIM");
            sessionStorage.removeItem("statusBerkas");
            sessionStorage.removeItem("waiting");
            sessionStorage.removeItem("rate");
            this.$router.push({
                name: 'AJR',
            });
        },

        dialogRateHandler(){
            if(sessionStorage.getItem('rate') != 'null'){
                this.color = 'blue darken-4'
                this.success_message = 'Anda sudah memberi rate dan ulasan. Terimakasih'
                this.snackbar2 = true
            }else{
                this.dialogRate = !this.dialogRate
            }
        },

        submit(){
            let newData = {
                ratingAJR: this.rate,
                performaAJR: this.ulasan
            }

            var url = this.$api + '/updateRate/customer/' + sessionStorage.getItem('id')
            this.$http.put(url, newData, {
                headers: {
                    'Authorization' : 'Bearer ' + sessionStorage.getItem('token'),
                }
            }).then(response => {
                this.success_message = response.data.message
                this.color = "green"
                this.snackbar2 = true
                this.dialogRate = !this.dialogRate
                sessionStorage.removeItem('rate')
                sessionStorage.setItem('rate', response.data.data.ratingAJR) 
            }).catch(error => {
                this.success_message = error.response.data.message
                this.color = "red"
                this.snackbar2 = true
            });
        }
    }
}
</script>

<style scoped>
.alphaColor{
    background-color: rgba(0, 0, 0, 0.7);
}

.buttonapp{
    color: white;
    padding: 20px;
    transition-duration: 0.4s;
    text-decoration: none;
}

.buttonapp:hover {
  background-color: #2F69C3;
  color: white;
  
}

.buttonapp:focus{
    background-color:#476A87;
    color: #FDD84B;
}

.carousel{
    background-color: rgba(0, 0, 0, 0.7);
    display: block;
    position: relative;
}

.overlap{
   position:absolute;
   top: 0;
   right: 0;
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

.overlap2{
   position:absolute;
   right: 0;
   opacity: 85%;
}

.bgBeranda{
    background: linear-gradient(-180deg, #0D47A1 10%, #010210 90%);
}

.before-enter{
    opacity:  0;
    transform: translateY(100px);
    transition: all 2s ease-out;
}

.enter{
    opacity: 1;
    transform: translateY(0px);
}

/* .reveal:link {
    font-size: 20;
    outline: thin solid;
}
.reveal:hover {
    background-color: #2F69C3;
    color: #FFFFFF;
    top: 0;
    left: 0;
    font-size: 20px;
} */

</style>