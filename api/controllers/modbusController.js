// create an empty modbus client
const ModbusRTU = require("modbus-serial");
const connConfig = require("../data/connModbus.json");

 
// open connection to a tcp line

class modbusConn {

  constructor() {
    this.data = {};
    this.client = new ModbusRTU();
    this.connected = false;
  }

async connect() {
    const error = await new Promise((resolve) => {

      //client.connectTCP("127.0.0.1", { port: 8502 });
      //client.setID(1);
      this.client.connectTCP(connConfig.ip, { port: connConfig.port }, (error) => resolve(error));
      this.client.setID(connConfig.id);
      
    });

    await this.onConnected(error);
  }

  async onConnected(err) {
    if (typeof (err) !== "undefined") {
      console.log(err);
      return;
    }
    this.connected = true;
    await this.read();

    setInterval(() => this.read(), 1000);
  }

  async read() {
    
    this.client.readHoldingRegisters(1, 2, function(err, data) {
      console.log(data.data);
      this.data.data = data.data;
    });

  }


  async listHoldingReg(req, res) {
    if (!this.connected) {
      await this.connect();
    }

    res.status(200).json(this.data);
  }



}

module.exports = new modbusConn();