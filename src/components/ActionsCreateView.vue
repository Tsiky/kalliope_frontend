<template>
  <div class="actions-create-view">
    <h1 class="ui header">Create action</h1>
    <div class="ui form">
      <div class="field">
        <label>Label</label>
        <input v-model="labelValue" type="text">
      </div>
      <div class="field">
        <label>Type</label>
        <select v-model="typeKey" class="ui dropdown actions-create-dropdown">
          <option v-for="(value, key) in types" :value="key">
            {{ value }}
          </option>
        </select>
      </div>
      <div class="field">
        <label>Name</label>
        <!-- Value isnt always updated -->
        <select v-model="nameKey" class="ui dropdown actions-create-dropdown">
          <option v-for="(value, key) in names[typeKey]" :value="key">
            {{ value }}
          </option>
        </select>
      </div>
    </div>

    <router-link to="/actions/">
      <button class="ui labeled icon button">
        <i class="chevron left icon"></i>
        Back
      </button>
    </router-link>
    <router-link to="/actions/">
      <button class="ui primary labeled icon button">
        <i class="checkmark icon"></i>
        Create
      </button>
    </router-link>
  </div>
</template>

<script>
  import $ from 'jquery'
  export default {
    name: 'ActionsCreateView',
    data () {
      return {
        'labelValue': '',
        'typeKey': '0',
        'types': ['Multimedia', 'Quiz', 'Color', 'Hardware', 'Webview', 'Arduino', 'Scene control', 'Update'],
        'nameKey': '0',
        'names': [
          ['Video', 'Streaming', 'Audio', 'Image', 'Text'],
          ['Question', 'Answer'],
          ['Color'],
          ['Torch'],
          ['Url'],
          ['HIGH', 'LOW'],
          ['scene_activate', 'scene_sendkeystroke'],
          ['medias', 'gps']]
      }
    },
    mounted: function () {
      $('.actions-create-dropdown').dropdown()
    },
    watch: {
      typeKey: function () {
        // Reset name select
        this.nameKey = 0
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
