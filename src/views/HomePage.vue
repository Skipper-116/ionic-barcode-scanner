<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>QRCode Scanner</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Scanning Page</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-list>
        <ion-item v-for="(barcode, index) in barcodes" v-bind:key="index">
          <ion-label position="stacked">{{ barcode.format }}</ion-label>
          <ion-input type="text" :value="barcode.rawValue"></ion-input>
        </ion-item>
      </ion-list>

      <ion-fab slot="fixed" vertical="bottom" horizontal="end">
        <ion-fab-button @click="home.scan()">
          <ion-icon :icon="scan"></ion-icon>
        </ion-fab-button>
      </ion-fab>
      
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { HomePage } from '@/app/home/home.page';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonInput, IonFab, IonFabButton, IonIcon } from '@ionic/vue';
import { scan } from 'ionicons/icons';
import { Barcode } from '@capacitor-mlkit/barcode-scanning';
import { ref } from 'vue';

const barcodes = ref(Array<Barcode>());
const home = new HomePage(barcodes.value);
</script>

<style scoped>
#container {
  text-align: center;
  
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  
  color: #8c8c8c;
  
  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>
