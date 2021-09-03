# overseer
self-hosted IoT monitoring platform

## Product design

Self-hosted IoT monitoring platform to gather and visualize data from multiple IoT devices (AKA nodes).
I follow the MVP (Minimum viable product) model for my personal projects. If I could design a system which can work with one nodeMCU device, one sensor and very simple UI for client-side, I would be able to build upon it, add more modules and improve the UI later on. so my initial plan is to create a closed circuit that works, then iterate over it and improve things as fast as possible.


<div style="text-align:center"><img src="/docs/product-design-diagram.png" /></div>

## System design

Using client-server architecture, there's a centralized Nest.js server that handles both MQTT subscriptions and RESTful API requests. On the client-side there's a React app that uses MQTT client library to subscribe to MQTT topics and display data. The data is then shown to the client by different forms and components based on it's type. Client can also tweak some settings and configurations and see the results immediately on the nodes.

<div style="text-align:center"><img src="/docs/system-design-diagram.jpg" /></div>