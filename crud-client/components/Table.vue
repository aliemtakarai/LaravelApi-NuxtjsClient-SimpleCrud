<template>
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
                <div class="links">
                <nuxt-link :to="{name:'item'}" class="btn btn-primary">Tambah Data</nuxt-link>
                </div>
                <div>
                    <table class="table table-hover">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in items" :key="item.id">
                            <td>{{ item.name }}</td>
                            <td>{{ item.description }}</td>
                            <td>{{ item.price }}</td>
                            <td>
                                <nuxt-link :to="'item/'+item.id" class="btn btn-danger">Edit</nuxt-link>
                                &nbsp;
                                <a href="/" v-on:click="deleteEntry(item.id)" class="btn btn-warning">Delete</a>
                            </td>
                        </tr>
                    </tbody>
                    </table>
                </div>
        </div>
    </div>
</template>
<script>
import axios from '~/plugins/axios'
export default {
    data: function(){
        return {
            items: []
        }
    },
    async mounted(){
        var app = this;
            await axios.get('items')
                .then(function (resp) {
                    app.items = resp.data;
                })
                .catch(function (resp) {
                    console.log(resp);
                    alert("Could not load items");
                });
    },
    methods: {
        deleteEntry(id) {
            if (confirm("Do you really want to delete it?")) {
                var app = this;
                axios.delete('items/' + id)
                    .then(function (resp) {
                        app.items.splice(id);
                    })
                    .catch(function (resp) {
                        alert("Could not delete company");
                    });
            }
        }
    }
}
</script>

