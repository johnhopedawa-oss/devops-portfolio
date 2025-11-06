const { MongoClient } = require('mongodb');

const mongoURL = process.env.MONGO_URL || 'mongodb://localhost:27017';
const client = new MongoClient(mongoURL);
const dbName = 'resumeDB';

const resumeData = {
  name: process.env.USER_NAME || "John Hope Dawa",
  title: "DevOps Engineer",
  email: process.env.USER_EMAIL || "your.email@example.com",
  location: process.env.USER_LOCATION || "Coquitlam, BC",
  summary: "Building overengineered solutions with Docker, Kubernetes, and way too many monitoring tools.",
  skills: ["Docker", "Kubernetes", "K3s", "Terraform", "GitHub Actions", "Linux", "Python", "Node.js", "MongoDB"],
  experience: [
    {
      company: "Snoogz Software",
      role: "DevOps Engineer",
      location: "Vancouver, BC",
      duration: "September 2025 – Present",
      responsibilities: [
        "Built and maintained deployment infrastructure using Docker, Kubernetes(K8s) and Terraform",
        "Automated CI/CD pipelines with GitHub Actions for container builds and cluster deployments",
        "Managed application configurations and sensitive data with Kubernetes Secrets and ConfigMaps",
        "Deployed and updated containerized applications across multiple environments for testing and production"
      ]
    },
    {
      company: "Personal Homelab",
      role: "Self Hosted Infrastructure",
      location: "Coquitlam, BC",
      duration: "August 2025 – Present",
      responsibilities: [
        "Building and maintaining a 3-node K3s cluster (2 Linux systems, 1 Raspberry Pi) running 24/7 for personal projects",
        "Running and monitoring two Minecraft servers with liveness probes and health checks to ensure uptime",
        "Developing and updating a Python Telegram app actively maintained within the cluster",
        "Managing containerized workloads with Docker and Kubernetes, using Secrets, ConfigMaps, and persistent volumes"
      ]
    }
  ],
  interests: ["Rock Climbing", "Stand-Up Comedy", "Running"]
};

async function seedDatabase() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db(dbName);
    const collection = db.collection('resume');
    
    // Clear existing data
    await collection.deleteMany({});
    
    // Insert new data
    await collection.insertOne(resumeData);
    console.log('Resume data inserted successfully!');
    
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await client.close();
  }
}

seedDatabase();