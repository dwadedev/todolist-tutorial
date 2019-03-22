<template>
  <div class="home">
    <img alt="Vue logo" src="@/assets/logo.png" id="vue-logo">
    <div class="title">What do I need to do today?</div>
    <input v-model="myTodo" /><button @click="addToDo">Add</button>
    <div v-if="errors !== ''" id="errors">{{ errors }}</div>

    <div v-if="this.$store.getters.getItems && this.$store.getters.getItems.length > 0">
      <div class="title">Today, you've go to do...</div>
 
     <div v-for="item in this.$store.getters.getItems" :key="item.id">
       {{ item.title }}<br /><br /><small style="text-decoration:underline;" @click="deleteItem(item.id)">Delete</small>
       <hr />
     </div>
   </div>
  </div>
</template>

<script>
import { db } from '@/main'

export default {
  name: 'home',
  beforeCreate: function () {
    this.$store.dispatch('setItems')
  },
  data: function () {
    return {
      myTodo: '',
      errors: ''
    }
  },
  methods: {
    addToDo: function () {
      this.errors = ''
      if (this.myTodo !== '') {
        db.collection('items').add({
          title: this.myTodo,
          created_at: Date.now()
        }).then((response) => {
          if (response) {
            this.myTodo = ''
          }
        }).catch((error) => {
          this.errors = error
        })
      } else {
        this.errors = 'Please enter some text'
      }
    },
    deleteItem: function (id) {
      if (id) {
        db.collection("items").doc(id).delete().then(function() {
          console.log('Document successfully deleted')
        }).catch(function(error) {
          this.error = error
        })
      } else {
        this.error = 'Invalid ID'
      }
    }
  }
}
</script>

<style>
* {
  box-sizing:border-box;
}

body, html, #app {
  background:#8ac8e5;
}

.home {
  width:300px;
  margin:auto;
}

#vue-logo {
  width:100px;
}

input, button {
  border:0;
  width:100%;
  margin:0 0 10px;
  padding:7px;
}

input {
  font-size:12px;
}

button {
  background:#43b823;
  border:0;
  text-transform:uppercase;
  color:#fff;
  font-weight:700;
  cursor:pointer;
}

.title {
  font-size:14px;
  font-weight:700;
  padding:0 0 10px 0;
  margin:0 0 10px 0;
  border-bottom:1px solid #666;
}

#errors {
  background:#a52222;
  color:#fff;
  padding:5px;
}
</style>
