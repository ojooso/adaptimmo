<template>
    <div>
        <router-link to="/" tag="button">BACK</router-link>
        <h1>Détail</h1>
        <ul>
            <li v-for="(value, attribute) in asset" :key="attribute">{{attribute}} : {{value}}</li>
            <li>Prix au mettre carré : {{m2price}}</li>
        </ul>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "Details",
    components: {},
    data() {
        return {
            asset: {},
        };
    },
    mounted() {
        axios
            .get(
                `https://apiclient.adaptimmo.com/test/bien/${this.$route.params.id}`
            )
            .then((res) => {
                this.asset = res.data.data;
            });
    },
    computed: {
        m2price() {
            if (!this.asset.price || !this.asset.area) return 0;
            return this.asset.price / this.asset.area;
        },
    },
};
</script>
