
<template>
  <div>
    <v-container fluid="">
      <v-row>
        <v-col cols="3">
          <h3>Tools</h3>
          <v-row style="margin-top: 20px">
            <v-col md="4"  xs="12">
              <v-btn
                  @click="exportDiagramTo()"
              >
                Save
                <v-icon>
                  mdi-heart
                </v-icon>
              </v-btn>
            </v-col>

            <v-col md="4"  xs="12">

              <v-dialog
                  v-model="dialog"
                  persistent
                  width="auto"
              >
                <template v-slot:activator="{ props }">
                  <v-btn
                      v-bind="props"
                  >
                    Load
                    <v-icon>
                      mdi-upload
                    </v-icon>
                  </v-btn>

                </template>
                <v-card>
                  <v-card-title class="text-h5">
                    Upload File From Disk
                  </v-card-title>
                  <v-card-text>
                    <input type="file" @change="onChangeFile" ref="file">

                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="green-darken-1"
                        variant="text"
                        @click="dialog = false"
                    >
                      Cancel
                    </v-btn>
                    <v-btn
                        color="green-darken-1"
                        variant="text"
                        @click="loadDiagramFromFile"
                    >
                      Upload
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>

            </v-col>
          </v-row>
          <v-divider :thickness="3" style="margin-top: 20px"></v-divider>

          <h3>Generals</h3>
          <v-row style="margin-top: 20px">
            <v-col md="4"  xs="12">
              <v-btn
                  @click="addTriangle()"
              >
                Triangle
                <v-icon>mdi-triangle</v-icon>
              </v-btn>
            </v-col>
            <v-col md="4"  xs="12">
              <v-btn
                  @click="addRectangle()"
              >
                Rectangle
                <v-icon>mdi-rectangle</v-icon>
              </v-btn>
            </v-col>
            <v-col md="4"  xs="12">
              <v-btn
                  @click="addEllipse()"
              >
                Ellipse
                <v-icon>mdi-ellipse</v-icon>
              </v-btn>
            </v-col>
            <v-col md="4"  xs="12">
              <v-btn
                  @click="addFlowDocument()"
              >
                Flow Doc
                <v-icon>mdi-current-ac</v-icon>
              </v-btn>
            </v-col>
            <v-col md="4"  xs="12">
              <v-btn
                  @click="addConnector()"
              >
                Connector
                <v-icon>mdi-vector-line</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-col>

        <v-col cols="9">
          <div id="UmlGraph" >
            <ejs-diagram id="diagram" ref="diagramObject" :width='width' :height='height' :nodes='nodes' :connectors='connectors' ></ejs-diagram>
          </div>
        </v-col>

      </v-row>
    </v-container>
  </div>
</template>

<script>
import FileSaver from "file-saver";

export default {
  data () {
    return {
      width: "100%",
      height: "600px",
      nodes: [],
      connectors: [],
      dialog: false,
    }
  },
  methods:{
    onChangeFile() {
      const file = this.$refs.file.files[0];
      if (file.name.includes(".json")) {
        this.fileObj=file
      }
    },
    loadDiagramFromFile() {
      let reader = new FileReader();
      reader.onload = e => {
        let json = JSON.parse(e.target.result);

        let diagram = this.$refs.diagramObject.ej2Instances;
        diagram.loadDiagram(json);

        this.dialog = false;
      };
      reader.readAsText(this.fileObj);
    },

    exportDiagramTo(){
      let diagramInstance = this.$refs.diagramObject.ej2Instances;
      let saveData = diagramInstance.saveDiagram();

      const blob = new Blob([JSON.stringify(saveData)], {type: "text/plain;charset=utf-8"});

      const filename ='diagram_'+ this.getNow()+ '.json';
      FileSaver.saveAs(blob,filename)
    },

    addEllipse(){
      let diagramObj = document.getElementById('diagram').ej2_instances[0];

      const last_id = this.findLastNodeId(diagramObj);
      const generatedId =this.generateNewNodeId(last_id)

      diagramObj.add({
        id: generatedId,
        height: 100,
        width: 100,
        offsetX: 250,
        offsetY: 300,
        shape: {
          type: 'Basic',
          shape: 'Ellipse',
        },
      })
    },
    addFlowDocument(){
      let diagramObj = document.getElementById('diagram').ej2_instances[0];

      const last_id = this.findLastNodeId(diagramObj);
      const generatedId =this.generateNewNodeId(last_id)

      diagramObj.add({
        id: generatedId,
        height: 100,
        width: 100,
        offsetX: 650,
        offsetY: 300,
        shape: {
          type: 'Flow',
          shape: 'Document'
        },
      })
    },
    addTriangle(){
      let diagramObj = document.getElementById('diagram').ej2_instances[0];

      const last_id = this.findLastNodeId(diagramObj);
      const generatedId =this.generateNewNodeId(last_id)

      diagramObj.add({
        id: generatedId,
        height: 100,
        width: 100,
        offsetX: 350,
        offsetY: 300,
        shape: {
          type: 'Basic',
          shape: 'Triangle',
        },
      })
    },
    addRectangle(){
      let diagramObj = document.getElementById('diagram').ej2_instances[0];

      const last_id = this.findLastNodeId(diagramObj);
      const generatedId =this.generateNewNodeId(last_id)

      diagramObj.add({
        id: generatedId,
        height: 100,
        width: 100,
        offsetX: 450,
        offsetY: 300,
        shape: {
          type: 'Basic',
          shape: 'Rectangle',
        },
      })
    },

    addConnector(){
      let diagramObj = document.getElementById('diagram').ej2_instances[0];

      const last_id = this.findLastConnectorId(diagramObj);
      const generatedId =this.generateNewConnectorId(last_id)

      diagramObj.add({
        id: generatedId,
        style: {
          strokeColor: '#6BA5D7',
          fill: '#6BA5D7',
          strokeWidth: 2
        },
        targetDecorator: {
          style: {
            fill: '#6BA5D7',
            strokeColor: '#6BA5D7'
          }
        },
        // Sets source and target points
        sourcePoint: {
          x: 100,
          y: 100
        },
        targetPoint: {
          x: 200,
          y: 200
        }
      })

    },

    findLastNodeId(diagramObj){
      let foundId = 0;
      let nodesLength = diagramObj.nodes.length

      if ( nodesLength> 0) {
        let nodeName = diagramObj.nodes[nodesLength - 1].properties.id;
        foundId = Number(nodeName.split('_')[1]);
      }

      return foundId
    },
    findLastConnectorId(diagramObj){
      let foundId = 0;
      let connectorsLength = diagramObj.connectors.length

      if ( connectorsLength> 0) {
        let connectorName = diagramObj.connectors[connectorsLength - 1].properties.id;
        foundId = Number(connectorName.split('_')[1]);
      }

      return foundId
    },

    generateNewNodeId(last_id){
      return  "node_"+String(last_id + 1)
    },
    generateNewConnectorId(last_id){
      return  "connector_"+String(last_id + 1)
    },
    getNow() {
      const today = new Date();
      const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      return  date +' '+ time;
    },

  }
}
</script>
