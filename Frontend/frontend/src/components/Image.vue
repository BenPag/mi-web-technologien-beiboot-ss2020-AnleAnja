<template>
    <div>
    <img v-bind:src="getUrl()" v-on:click="$emit('open-image')"/>
    </div>
</template>

<script>
import { urlConfig } from '../AppContext';

export default {
    props: ['img', 'size', 'square','sharpen', 'blur'],
    data: () => ({}),
    created() {
    },
    methods: {
        getUrl: function () {
            const path = urlConfig.getUrl(`image/${this.img}`);
            let target = new URL(path);

            if (this.square) {
                target.searchParams.append('square', 'true');
            }
            if (this.size) {
                target.searchParams.append('size', `${this.size}`);
            }
            if (this.sharpen){
                target.searchParams.append('sharpen', 'true');
            }
            if (this.blur) {
                target.searchParams.append('blur', 'true');
            }
            return target.toString();
        }
    }
};
</script>

<style scoped>
    img {
        height: 100%;
    }
    div{
        padding: 10px;
        text-align: center;
    }
</style>