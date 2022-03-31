<template>
<img class="logo" alt="Vue logo" src="../assets/team-logo.png">
    <h2>Sign Up</h2>
    <div class="register">
        <input type="text" v-model="name" placeholder="Enter Employee Name"/>
         <input type="text" v-model="email" placeholder="Enter Employee Email"/>
          <input type="password" v-model="password" placeholder="Enter Password"/>
          <button v-on:click="sighUp">Sign Up</button>
          <p>
              <router-link to="/login">Login</router-link>
          </p>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name :'SignUp',
    data()
    {
        return{
            name:'',
            email:'',
            password:''
        }
    },
    methods:{
        async sighUp()
        {
            let result = await axios.post("http://localhost:3000/user",{
            email:this.email,
           password:this.password,
           name:this.name
            })
            console.warn(result);
            if(result.status==201)
            {
               
                localStorage.setItem("user-info",JSON.stringify(result.data))
                this.$router.push({name:'Home'})
            }
        }
    },
    mounted()
    {
        let user =localStorage.getItem('user-info')
        if(user)
        {
            this.$router.push({name:'Home'})
        }
    }
        
}
</script>

<style >

</style>