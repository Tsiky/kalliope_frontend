<template>
  <div class="triggers-view">
    <h1 class="ui header">Triggers</h1>
    <table class="ui padded table">
      <thead><tr>
        <th>Name</th>
        <th>Content</th>
        <th></th>
      </tr></thead>
      <tbody>
      <tr v-if="Object.keys(triggers).length === 0 && triggers.constructor === Object">
        <td>No trigger registered</td>
      </tr>
      <tr v-for="(value, key) in triggers">
        <td>{{ value.name }}</td>
        <td v-if="triggerToUpdate !== value.name">{{ value.content }}</td>
        <td v-else>
          <div class="ui form">
            <div class="field">
              <textarea v-model="updatedContent" rows="2"></textarea>
            </div>
          </div>
        </td>
        <td v-if="triggerToUpdate !== value.name">
          <button v-on:click="editTrigger(value)" class="ui icon button" title="Edit">
            <i class="setting icon"></i>
          </button>
          <button v-on:click="showDeleteModal(value.name)" class="ui icon button" title="Delete">
            <i class="trash icon"></i>
          </button>
        </td>
        <td v-else>
          <button v-on:click="updateTrigger(value.name)" class="ui icon button" title="Update">
            <i class="checkmark icon"></i>
          </button>
          <button v-on:click="cancelEditTrigger()" class="ui icon button" title="Cancel">
            <i class="remove icon"></i>
          </button>
        </td>
      </tr>
      </tbody>
    </table>

    <h4 class="ui horizontal divider header">
      <i class="plus chart icon"></i>
      New trigger
    </h4>
    <div class="ui form">
      <div class="field">
        <label>Name</label>
        <input v-model='newName' type='text'>
      </div>
      <div class="field">
        <label>Content</label>
        <textarea v-model="newContent" rows="2"></textarea>
      </div>
    </div>
    <div class="triggers-buttons">
      <button v-on:click="addTrigger()" v-bind:class="{ disabled: !canAddTrigger, loading: loading }" class="ui primary labeled icon button">
        <i class="add icon"></i>
        Add trigger
      </button>
    </div>

    <!-- Delete modal -->
    <modal v-model="showModal">
      <p slot="header">Delete trigger</p>
      <p slot="content">Are you sure you want to permanently remove the trigger "{{ triggerToDeleteName }}" ?</p>
      <template slot="actions">
        <div class="ui red cancel button" @click="showModal=false">
          No
        </div>
        <div class="ui green ok right button" @click="removeTrigger()">
          Yes
        </div>
      </template>
    </modal>
  </div>
</template>

<script>
  import Store from '../store/StoreVuex.vue'
  import modal from 'vue-semantic-modal'
  export default {
    name: 'TriggersView',
    components: {
      modal
    },
    data () {
      return {
        'newName': '',
        'newContent': '',
        'triggerToUpdate': '',
        'updatedContent': '',
        'triggerToDeleteName': '',
        'loading': false,
        'showModal': false
      }
    },
    computed: {
      triggers: function () {
        return Store.getters['triggers/getTriggers']
      },
      canAddTrigger: function () {
        return this.newName !== '' && this.newContent !== ''
      },
      selectedUser: function () {
        return Store.getters['users/getSelectedUser']
      }
    },
    created: function () {
      // Get actions from API
      this.$http.get('/api/myapp/trigger?user=' + this.selectedUser).then(response => {
        Store.commit('triggers/setTriggers', response.body)
      }, response => {
        // error callback
        console.log(response.body)
      })
    },
    methods: {
      showDeleteModal: function (name) {
        this.triggerToDeleteName = name
        this.showModal = true
      },
      addTrigger: function () {
        this.loading = true
        if (this.canAddTrigger) {
          let newTrigger = {
            'name': this.newName,
            'content': this.newContent
          }
          this.$http.put('/api/myapp/trigger?user=' + this.selectedUser, newTrigger).then(response => {
            this.loading = false
            Store.commit('triggers/addTrigger', newTrigger)
            this.newName = ''
            this.newContent = ''
          }, response => {
            // error callback
            console.log(response.body)
            alert('Error')
            this.loading = false
          })
        }
      },
      removeTrigger: function () {
        this.$http.delete('/api/myapp/trigger?user=' + this.selectedUser, {params: { name: this.triggerToDeleteName }}).then(response => {
          Store.commit('triggers/removeTrigger', this.triggerToDeleteName)
          this.showModal = false
        }, response => {
          // error callback
          console.log(response.body)
          alert('Error')
          this.loading = false
        })
      },
      updateTrigger: function (name) {
        this.loading = true
        let updatedTrigger = {
          'name': name,
          'content': this.updatedContent
        }
        this.$http.put('/api/myapp/trigger?user=' + this.selectedUser, updatedTrigger).then(response => {
          this.loading = false
          Store.commit('triggers/setTrigger', updatedTrigger)
          this.triggerToUpdate = ''
          this.updatedContent = ''
        }, response => {
          // error callback
          console.log(response.body)
          alert('Error')
          this.loading = false
        })
      },
      editTrigger: function (trigger) {
        this.triggerToUpdate = trigger.name
        this.updatedContent = trigger.content
      },
      cancelEditTrigger: function () {
        this.triggerToUpdate = ''
        this.updatedContent = ''
      },
      compare: function (a, b) {
        if (a.name < b.name) {
          return -1
        }
        if (a.name > b.name) {
          return 1
        }
        return 0
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .triggers-buttons {
    margin-top: 1.5rem;
  }
</style>
