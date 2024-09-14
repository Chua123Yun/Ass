import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import DirectoryScreen from "./DirectoryScreen"; 
import BreadStory from "./DetailsPages/BreadStory"; 
import HoganBakery from "./DetailsPages/HoganBakery"; 
import RussellSalon from "./DetailsPages/RussellSalon";
import TheNailShop from "./DetailsPages/TheNailShop";
import AsterSpring from "./DetailsPages/AsterSpring";
import Popular from "./DetailsPages/Popular";
import PopMart from "./DetailsPages/PopMart";
import Balloon from "./DetailsPages/Balloon";
import Aeon1 from "./DetailsPages/Aeon1";
import Aeon2 from "./DetailsPages/Aeon2";

import Samsung from "./DetailsPages/Samsung";

import Vivo from "./DetailsPages/Vivo";
import BoxHunt from "./DetailsPages/BoxHunt";
import GamersHideout from "./DetailsPages/Gamer'sHideout";
import YamahaMusic from "./DetailsPages/YamahaMusic";
import Cheetah from "./DetailsPages/Cheetah";
import CottonOn from "./DetailsPages/CottonOn";
import FOS from "./DetailsPages/FOS";
import HnM from "./DetailsPages/HnM";
import LevisStore from "./DetailsPages/Levi'sStore";
import Uniqlo from "./DetailsPages/Uniqlo";
import KFC from "./DetailsPages/KFC";
import BurgerKing from "./DetailsPages/BurgerKing";
import McDonalds from "./DetailsPages/McDonalds";
import BIBI from "./DetailsPages/BIBI";
import KRR from "./DetailsPages/KRR";
import SecretRecipe from "./DetailsPages/SecretRecipe";
import SeoulGarden from "./DetailsPages/SeoulGarden";
import StarBucks from "./DetailsPages/StarBucks";
import SushiKing from "./DetailsPages/SushiKing";
import FoodDistrict from "./DetailsPages/FoodDistrict";
import TGV from "./DetailsPages/TGV";
import Karaoke from "./DetailsPages/Karaoke";
import GINTELL from "./DetailsPages/GINTELL";
import Guardian from "./DetailsPages/Guardian";
import Watson from "./DetailsPages/Watson";
import Daiso from "./DetailsPages/Daiso";
import MRDIY from "./DetailsPages/MRDIY";
import MyNews from "./DetailsPages/MyNews";
import MixStore from "./DetailsPages/MixStore";
import CU from "./DetailsPages/CU";
import BaskinRobbins from "./DetailsPages/BaskinRobbins";
import BeeChengHiang from "./DetailsPages/BeeChengHiang";
import InsideScoop from "./DetailsPages/InsideScoop";
import ADIDAS from "./DetailsPages/ADIDAS";
import NIKE from "./DetailsPages/NIKE";
import Decathlon from "./DetailsPages/Decathlon";

import G22 from './MapPages/G22'; 
import G26 from "./MapPages/G26";
import L152 from "./MapPages/L152";
import G08 from "./MapPages/G08";
import G16 from "./MapPages/G16";
import L150 from "./MapPages/L150";
import L169 from "./MapPages/L169";
import L175 from "./MapPages/L175";
import G80 from "./MapPages/G80";
import L181 from "./MapPages/L181";
import L166 from "./MapPages/L166";
import G39 from "./MapPages/G39";
import L170 from "./MapPages/L170";
import L168 from "./MapPages/L168";
import G36 from "./MapPages/G36";
import L160 from "./MapPages/L160";
import L151 from "./MapPages/L151";
import L163 from "./MapPages/L163";
import L156 from "./MapPages/L156";
import L158 from "./MapPages/L158";
import L164 from "./MapPages/L164";
import G37 from "./MapPages/G37";
import G30 from "./MapPages/G30";
import G01 from "./MapPages/G01";
import G06 from "./MapPages/G06";
import L153 from "./MapPages/L153";
import G19 from "./MapPages/G19";
import G43 from "./MapPages/G43";
import G45 from "./MapPages/G45";
import G28 from "./MapPages/G28";
import L177 from "./MapPages/L177";
import L283 from "./MapPages/L283";
import L282 from "./MapPages/L282";
import G41 from "./MapPages/G41";
import G14 from "./MapPages/G14";
import G34 from "./MapPages/G34";
import L171 from "./MapPages/L171";
import L176 from "./MapPages/L176";
import L165 from "./MapPages/L165";
import G21 from "./MapPages/G21";
import G03 from "./MapPages/G03";
import L178 from "./MapPages/L178";
import G07 from "./MapPages/G07";
import G05 from "./MapPages/G05";
import G42 from "./MapPages/G42";
import L161 from "./MapPages/L161";
import L174 from "./MapPages/L174";
import { stores ,Store} from "./CommonData";

//add more here later
const Stack = createStackNavigator();
// Function to map store components dynamically

const DirectoryStack = () => {
  return (
    <Stack.Navigator>

      
      <Stack.Screen
        name="Directory"
        component={DirectoryScreen}
        options={{ headerShown: false }}
      />
       
       <Stack.Screen name={stores.bakery[0].name}component={BreadStory}options={{ title: "Details" }}/> 
      <Stack.Screen name={stores.bakery[1].name} component={HoganBakery} options={{ title: "Details" }}/>

      <Stack.Screen name={stores.beauty[0].name} component={RussellSalon} options={{ title: "Details" }}/>
      <Stack.Screen name={stores.beauty[1].name} component={TheNailShop} options={{ title: "Details" }}/>
      <Stack.Screen name={stores.beauty[2].name} component={AsterSpring} options={{ title: "Details" }}/>

      <Stack.Screen name={stores.books[0].name} component={Popular} options={{ title: "Details" }}/>
      <Stack.Screen name={stores.books[1].name} component={PopMart} options={{ title: "Details" }}/>
      <Stack.Screen name={stores.books[2].name} component={Balloon} options={{ title: "Details" }}/>

      <Stack.Screen name={stores.department[0].name} component={Aeon1} options={{ title: "Details" }}/>
      <Stack.Screen name={stores.department[1].name} component={Aeon2} options={{ title: "Details" }}/>

      <Stack.Screen name={stores.digital[0].name} component={Samsung} options={{ title: "Details" }}/>
      <Stack.Screen name={stores.digital[1].name} component={Vivo} options={{ title: "Details" }}/>

      <Stack.Screen name={stores.enrichment[0].name}component={BoxHunt} options={{ title: "Details" }}/>
      <Stack.Screen name={stores.enrichment[1].name} component={GamersHideout} options={{ title: "Details" }}/>
      <Stack.Screen name={stores.enrichment[2].name} component={YamahaMusic} options={{ title: "Details" }}/>

      <Stack.Screen name={stores.fashion[0].name} component={Cheetah} options={{ title: "Details" }}/>
      <Stack.Screen name={stores.fashion[1].name}component={CottonOn} options={{ title: "Details" }}/>
      <Stack.Screen name={stores.fashion[2].name} component={FOS} options={{ title: "Details" }}/>
      <Stack.Screen name={stores.fashion[3].name}component={HnM} options={{ title: "Details" }}/>
      <Stack.Screen name={stores.fashion[4].name} component={LevisStore} options={{ title: "Details" }}/>
      <Stack.Screen name={stores.fashion[5].name}component={Uniqlo} options={{ title: "Details" }}/>

      <Stack.Screen name={stores.food[0].name}component={KFC} options={{ title: "Details" }}/>
      <Stack.Screen name={stores.food[1].name} component={BurgerKing} options={{ title: "Details" }}/>
      <Stack.Screen name={stores.food[2].name} component={McDonalds} options={{ title: "Details" }}/>
      <Stack.Screen name={stores.food[3].name}component={BIBI} options={{ title: "Details" }}/>
      <Stack.Screen name={stores.food[4].name} component={KRR} options={{ title: "Details" }}/>
      <Stack.Screen name={stores.food[5].name} component={SecretRecipe} options={{ title: "Details" }}/>
      <Stack.Screen name={stores.food[6].name}component={SeoulGarden} options={{ title: "Details" }}/>
      <Stack.Screen name={stores.food[7].name} component={StarBucks} options={{ title: "Details" }}/>
      <Stack.Screen name={stores.food[8].name} component={SushiKing} options={{ title: "Details" }}/>

      <Stack.Screen name={stores.foodcourt[0].name} component={FoodDistrict} options={{ title: "Details" }}/>

      <Stack.Screen name={stores.entertainment[0].name}component={TGV} options={{ title: "Details" }}/>
      <Stack.Screen name={stores.entertainment[1].name} component={Karaoke} options={{ title: "Details" }}/>

      <Stack.Screen name={stores.health[0].name}component={GINTELL} options={{ title: "Details" }}/>
      <Stack.Screen name={stores.health[1].name} component={Guardian} options={{ title: "Details" }}/>
      <Stack.Screen name={stores.health[2].name} component={Watson} options={{ title: "Details" }}/>

      <Stack.Screen name={stores.lifestyle[0].name}component={Daiso} options={{ title: "Details" }}/>
      <Stack.Screen name={stores.lifestyle[1].name} component={MRDIY} options={{ title: "Details" }}/>

      <Stack.Screen name={stores.convienience[0].name} component={MyNews} options={{ title: "Details" }}/>
      <Stack.Screen name={stores.convienience[1].name} component={MixStore} options={{ title: "Details" }}/>
      <Stack.Screen name={stores.convienience[2].name}component={CU} options={{ title: "Details" }}/>

      <Stack.Screen name={stores.snacks[0].name} component={BaskinRobbins} options={{ title: "Details" }}/>
      <Stack.Screen name={stores.snacks[1].name} component={BeeChengHiang} options={{ title: "Details" }}/>
      <Stack.Screen name={stores.snacks[2].name} component={InsideScoop} options={{ title: "Details" }}/>

      <Stack.Screen name={stores.sports[0].name} component={ADIDAS} options={{ title: "Details" }}/>
      <Stack.Screen name={stores.sports[1].name} component={NIKE} options={{ title: "Details" }}/>
      <Stack.Screen name={stores.sports[2].name} component={Decathlon} options={{ title: "Details" }}/> 
  

      
      <Stack.Screen name="G22" component={G22} options={{ title: "Map" }}/>
      <Stack.Screen name="G26" component={G26} options={{ title: "Map" }}/>
      <Stack.Screen name="L152" component={L152} options={{ title: "Map" }}/>
      <Stack.Screen name="G08" component={G08} options={{ title: "Map" }}/>
      <Stack.Screen name="G16" component={G16} options={{ title: "Map" }}/>
      <Stack.Screen name="L150" component={L150} options={{ title: "Map" }}/>
      <Stack.Screen name="L169" component={L169} options={{ title: "Map" }}/>
      <Stack.Screen name="L175" component={L175} options={{ title: "Map" }}/>
      <Stack.Screen name="G80" component={G80} options={{ title: "Map" }}/>
      <Stack.Screen name="L181" component={L181} options={{ title: "Map" }}/>
      <Stack.Screen name="L166" component={L166} options={{ title: "Map" }}/>
      <Stack.Screen name="G39" component={G39} options={{ title: "Map" }}/>
      <Stack.Screen name="L170" component={L170} options={{ title: "Map" }}/>
      <Stack.Screen name="L168" component={L168} options={{ title: "Map" }}/>
      <Stack.Screen name="G36" component={G36} options={{ title: "Map" }}/>
      <Stack.Screen name="L160" component={L160} options={{ title: "Map" }}/>
      <Stack.Screen name="L151" component={L151} options={{ title: "Map" }}/>
      <Stack.Screen name="L163" component={L163} options={{ title: "Map" }}/>
      <Stack.Screen name="L156" component={L156} options={{ title: "Map" }}/>
      <Stack.Screen name="L158" component={L158} options={{ title: "Map" }}/>
      <Stack.Screen name="L164" component={L164} options={{ title: "Map" }}/>
      <Stack.Screen name="G37" component={G37} options={{ title: "Map" }}/>
      <Stack.Screen name="G30" component={G30} options={{ title: "Map" }}/>
      <Stack.Screen name="G01" component={G01} options={{ title: "Map" }}/>
      <Stack.Screen name="G06" component={G06} options={{ title: "Map" }}/>
      <Stack.Screen name="L153" component={L153} options={{ title: "Map" }}/>
      <Stack.Screen name="G19" component={G19} options={{ title: "Map" }}/>
      <Stack.Screen name="G43" component={G43} options={{ title: "Map" }}/>
      <Stack.Screen name="G45" component={G45} options={{ title: "Map" }}/>
      <Stack.Screen name="G28" component={G28} options={{ title: "Map" }}/>
      <Stack.Screen name="L177" component={L177} options={{ title: "Map" }}/>
      <Stack.Screen name="L283" component={L283} options={{ title: "Map" }}/>
      <Stack.Screen name="L282" component={L282} options={{ title: "Map" }}/>
      <Stack.Screen name="G14" component={G14} options={{ title: "Map" }}/>
      <Stack.Screen name="G34" component={G34} options={{ title: "Map" }}/>
      <Stack.Screen name="L171" component={L171} options={{ title: "Map" }}/>
      <Stack.Screen name="L176" component={L176} options={{ title: "Map" }}/>
      <Stack.Screen name="L165" component={L165} options={{ title: "Map" }}/>
      <Stack.Screen name="G21" component={G21} options={{ title: "Map" }}/>
      <Stack.Screen name="G41" component={G41} options={{ title: "Map" }}/>
      <Stack.Screen name="G03" component={G03} options={{ title: "Map" }}/>
      <Stack.Screen name="L178" component={L178} options={{ title: "Map" }}/>
      <Stack.Screen name="G07" component={G07} options={{ title: "Map" }}/>
      <Stack.Screen name="G05" component={G05} options={{ title: "Map" }}/>
      <Stack.Screen name="G42" component={G42} options={{ title: "Map" }}/>
      <Stack.Screen name="L161" component={L161} options={{ title: "Map" }}/>
      <Stack.Screen name="L174" component={L174} options={{ title: "Map" }}/>



    </Stack.Navigator>

  );
};

export default DirectoryStack;
