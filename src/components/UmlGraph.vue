<template>
  <div>
    <v-container fluid="">
      <v-row>
        <v-col cols="3">
          <h3>Tools</h3>
          <v-row style="margin-top: 20px">
            <v-col cols="4">
              <v-btn
                  @click="exportDiagramTo()"
              >
                Save
              </v-btn>
            </v-col>
            <v-col cols="4">
              <v-btn
                  @click="addNode()"
              >
                Load
              </v-btn>
            </v-col>
          </v-row>
          <v-divider :thickness="3" style="margin-top: 20px"></v-divider>

          <h3>Generals</h3>
          <v-row style="margin-top: 20px">
            <v-col cols="4">
              <v-btn
                  @click="addTriangle()"
              >
                Triangle
              </v-btn>
            </v-col>
            <v-col cols="4">
              <v-btn
                  @click="addRectangle()"
              >
                Rectangle
              </v-btn>
            </v-col>
            <v-col cols="4">
              <v-btn
                  @click="addEllipse()"
              >
                Ellipse
              </v-btn>
            </v-col>
            <v-col cols="4">
              <v-btn
                  @click="addConnector()"
              >
                Connector
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
// import {IExportOptions} from "@syncfusion/ej2-vue-diagrams";
import {Diagram} from "@syncfusion/ej2-vue-diagrams";
import FileSaver from "file-saver";

export default {
  data () {
    return {
      width: "100%",
      height: "600px",
      nodes: [],
      connectors: []
    }
  },
  methods:{
    addNode(){

      let diagramObj = document.getElementById('diagram').ej2_instances[0];

      diagramObj.add({
        id: "node_1",
        height: 100,
        width: 100,
        offsetX: 250,
        offsetY: 300,
      })

      diagramObj.add({
        id: "node_2",
        height: 100,
        width: 100,
        offsetX: 450,
        offsetY: 300,
      })

      diagramObj.add({
        id: "connector_1",
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
        // sourceID: "node_1",
        // targetID: "node_2"
      })

    },

    exportDiagramTo(){
      let diagramInstance = this.$refs.diagramObject.ej2Instances;
      let saveData = diagramInstance.saveDiagram();
      const data = JSON.stringify(saveData)
      const blob = new Blob([JSON.stringify(data)], {type: "text/plain;charset=utf-8"});
      FileSaver.saveAs(blob,'a.json')
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
    }

  }
}
</script>
