<template>
<Header/>
    <h1>Welcome to Add restaurant page</h1>
    <form class="add">
        <input type="text" placeholder="Enter Name" v-model="restaurant.name"/>
        <input type="text" placeholder="Enter Address" v-model="restaurant.address"/>
        <input type="text" placeholder="Enter Contact" v-model="restaurant.contact"/>
        <button type="button" v-on:click="addRestaurant">Add New restaurant</button>
    </form>
</template>

<script>
import Header from './Header.vue'
import axios from 'axios';
export default {
    name:'Home',
    components:{
        Header
    },
    data()
    {
        return{
            restaurant :{
                name:'',
                address:'',
                contact:'',

            }

        }
    },
    methods:{
       async addRestaurant()
        {
            console.warn(this.restaurant);
            const result = await axios.post("http://localhost:3000/restaurant",{
            name:this.restaurant.name,
            address:this.restaurant.address,
            contact:this.restaurant.contact
        })
        if(result.status==201)
        {
            this.$router.push({name:'Home'})
        }
        console.warn("result",result);
        }
    },
    mounted()
    {
        let user =localStorage.getItem('user-info')
        if(!user)
        {
            this.$router.push({name:'SignUp'})
        }
    }
}
</script>


