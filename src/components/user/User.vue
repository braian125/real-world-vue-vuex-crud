<template>
    <table class="table">
        <thead>
            <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">E-mail</th>
            <th scope="col">Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="user in users" :key="user.id">
                <th scope="row">{{ user.id }}</th>
                <td>{{ user.name }}</td>
                <td>{{ user.last_name }}</td>
                <td>{{ user.email }}</td>
                <td>
                    <ul class="actions">
                        <li>
                            <router-link class="nav-link" :to="'/user/'+user.id+'/profile'"><i class="fas fa-eye"></i></router-link>
                        </li>
                        <li>
                            <router-link class="nav-link" :to="'/user/'+user.id"><i class="fas fa-user-edit"></i></router-link>
                        </li>
                        <li>
                            <a @click="destroy(user)" class="nav-link" v-if="!user.deleted_at"><i class="fas fa-user-times"></i></a>
                            <a @click="update(user)" class="nav-link" v-if="user.deleted_at"><i class="fas fa-user-check"></i></a>
                        </li>
                    </ul>
                </td>
            </tr>
            <tr v-if="loading">
                <td colspan="5"><img src="images/preloader.gif"></td>
            </tr>
        </tbody>
    </table>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    name: 'User',
    data() {
        return {}
    },
    computed: {
        ...mapGetters({'users': 'user/users', 'loading': 'loading'})
    },
    methods: {
        destroy(user) {
            this.$store.dispatch('user/destroy', user);
        },
        update(user) {
            user.deleted_at = null;
            this.$store.dispatch('user/save', user);
        }
    },
    created() {
        //this.users.length==0?this.$store.dispatch('user/all'):'';
        this.$store.dispatch('user/all')
    }
}
</script>

<style>
    ul.actions li {
        list-style-type: none;
    }
    ul.actions {
        display: flex;
    }
</style>
