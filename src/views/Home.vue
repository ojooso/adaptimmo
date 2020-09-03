<template>
    <div>
        Type : <select v-model="type">
            <option :value="null">ALL</option>
            <option value="HOUSE">HOUSE</option>
            <option value="FLAT">FLAT</option>
            <option value="LAND">LAND</option>
        </select>

        Etat : <select v-model="state">
            <option :value="null">ALL</option>
            <option value="ACTIVE">ACTIVE</option>
            <option value="INACTIVE">INACTIVE</option>
        </select>

        <div v-for="asset in assets" :key="asset.id">
            <router-link :to="`/details/${asset.id}`">
                <h2>{{asset.title}}</h2>
            </router-link>
            <h3>{{asset.price}}</h3>
            <p>{{asset.description}}</p>
        </div>

        <template v-for="n in pages">
            <button :key="`page-${n}`" @click="page = n">{{n}}</button>
        </template>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "Home",
    components: {},
    data() {
        return {
            type: null,
            state: null,
            assets: [],
            page: 1,
            pages: 0,
        };
    },
    mounted() {
        this.getAssets();
    },
    methods: {
        getAssets() {
            const attributes = ["perPage=20", `page=${this.page}`];

            if (this.type) attributes.push(`filter[type]=${this.type}`);
            if (this.state) attributes.push(`filter[state]=${this.state}`);

            axios
                .get(
                    `https://apiclient.adaptimmo.com/test/bien?${attributes.join(
                        "&"
                    )}`
                )
                .then((res) => {
                    this.assets = res.data.data;
                    this.pages = res.data.meta.last_page;
                });
        },
    },
    watch: {
        type() {
            this.getAssets();
        },
        state() {
            this.getAssets();
        },
        page() {
            this.getAssets();
        },
    },
};
</script>
