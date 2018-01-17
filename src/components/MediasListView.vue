<template>
  <div class="medias-list-view">
    <h1 class="ui header">Medias</h1>

    <div class="ui cards">
      <div v-for="media in medias" class="ui card">
        <div class="content">
          <div class="header">
            {{ media.name }}
          </div>
          <div class="ui image">
            <img :src="media.content_url"/>
          </div>
        </div>
        <div class="ui three bottom attached fluid buttons">
          <div v-on:click="showDeleteModal(key)" class="ui icon button">
            <i class="trash icon"></i>
          </div>
        </div>
      </div>
    </div>
    <router-link to="/medias/create">
      <button class="ui primary labeled icon button">
        <i class="add icon"></i>
        Add media
      </button>
    </router-link>
  </div>
</template>

<script>
  import Consts from '../store/consts/Consts'
  export default {
    name: 'MediasListView',
    data () {
      return {
        'medias': []
      }
    },
    created: function () {
      this.$http.get('/api/myapp/v1/customers/' + Consts.KALLIOPE_USER + '/channels/' + Consts.CHANNEL_ID + '/medias').then(response => {
        if (response.body) {
          this.medias = response.body.fields
          console.log(this.medias)
        }
      }, response => {
        // error callback
        console.log(response.body)
      })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
