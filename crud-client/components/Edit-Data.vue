<template>
    <form v-on:submit.prevent="saveForm()">
        <div class="form-group">
            <label>Name</label>
            <input type="text" name="name" id="name" v-model="item.name" class="form-control">
        </div>
        <div class="form-group">
            <label>Description</label>
            <input type="text" name="description" id="description" v-model="item.description" class="form-control">
        </div>
        <div class="form-group">
            <label>Price</label>
            <input type="number" name="price" id="price" v-model="item.price" class="form-control">
        </div>
        <div class="form-group">
            <button class="btn btn-primary">Update</button>
        </div>
    </form>
</template>
<script>
import axios from '~/plugins/axios'
export default {
    async mounted(){
        var app = this;
        let id = app.$route.params.id
        app.id = id;
            await axios.get('items/'+id+'/edit')
                .then(function (resp) {
                    app.item = resp.data;
                })
                .catch(function (resp) {
                    console.log(resp);
                    alert("Could not load items");
                });
    },
    data: function(){
        return {
            id: null,
            item:{
                name: '',
                description: '',
                price: ''
            }
        }
    },
    methods: {
        saveForm() {
            event.preventDefault();
            var app = this;
            var newItem = app.item;
            axios.put('items/'+app.id, newItem)
                .then(function (resp) {
                    app.$router.push({path: '/'});
                })
                .catch(function (resp) {
                    console.log(resp);
                    alert("Could not create your item");
                });
        }
    }
}
</script>


