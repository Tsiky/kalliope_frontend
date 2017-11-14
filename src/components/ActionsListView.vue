<template>
  <div class="actions-list-view">
    <h1 class="ui header">Actions</h1>

    <div class="ui cards">
      <div v-for="(value, key) in actions" class="ui card">
        <div class="content">
          <div class="header">{{ value.label }}</div>
          <div class="description">
            {{ value.type }} : {{ value.name }}
          </div>
        </div>
        <div class="ui two bottom attached fluid buttons">
          <div class="ui icon button">
            <i class="setting icon"></i>
          </div>
          <div v-on:click="showDeleteModal(key)" class="ui icon button">
            <i class="trash icon"></i>
          </div>
        </div>
      </div>
    </div>



    <router-link to="/actions/create">
      <button class="ui primary labeled icon button">
        <i class="add icon"></i>
        Add action
      </button>
    </router-link>

    <!-- Delete modal -->
    <div class="ui basic modal actions-delete-modal">
      <div class="ui icon header">
        <i class="trash icon"></i>
        Delete action
      </div>
      <div class="content modal-content">
        <p>Are you sure you want to permanently remove the action "{{ actionToDeleteLabel }}" ?</p>
      </div>
      <div class="actions center">
        <div class="ui red cancel inverted button">
          <i class="remove icon"></i>
          No
        </div>
        <div v-on:click="removeAction()" class="ui green ok inverted button">
          <i class="checkmark icon"></i>
          Yes
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  export default {
    name: 'ActionsListView',
    data () {
      return {
        'actions': [{
          'label': 'Blue screen',
          'type': 'color',
          'name': 'color'
        }, {
          'label': 'Red screen',
          'type': 'color',
          'name': 'color'
        }, {
          'label': 'First quizz',
          'type': 'quizz',
          'name': 'question'
        }, {
          'label': 'Second quizz',
          'type': 'quizz',
          'name': 'answer'
        }],
        'actionToDeleteLabel': '',
        'actionToDeleteIndex': null
      }
    },
    mounted: function () {
//      this.$http.get('/api/get/workflows').then(response => {
//        console.log(response.body)
//      }, response => {
//        // error callback
//        console.log(response.body)
//      })
    },
    methods: {
      showDeleteModal: function (index) {
        this.actionToDeleteLabel = this.actions[index].label
        this.actionToDeleteIndex = index
        $('.actions-delete-modal').modal('show')
      },
      removeAction: function () {
        if (this.actionToDeleteIndex !== null) {
          this.actions.splice(this.actionToDeleteIndex, 1)
        }
        this.actionToDeleteIndex = null
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
