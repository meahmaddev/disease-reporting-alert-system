# Disease Reporting Alert System — Event-Driven AI Gateway

A production-ready, event-driven data pipeline engineered for the healthcare sector. This system securely ingests live patient data feeds, maps and normalizes unstructured schemas, and uses intelligent classification triggers to detect epidemic outbreak patterns before distributing real-time alerts across enterprise hospital networks.

## 🛠️ Tech Stack & Architecture
- **Orchestration Layer:** n8n Workflow Automation (Self-Hosted / Cloud)
- **Runtime Environment:** Node.js / JavaScript (ES6+)
- **Data Ingestion:** REST APIs, Custom Webhooks, and Event Observers
- **AI Processing Layer:** Large Language Models (LLMs) configured for high-accuracy JSON classification

## 📡 System Architecture & Data Flow
1. **Asynchronous Ingestion:** Live telemetry data and clinician text reports are securely captured via optimized HTTP POST webhooks inside n8n.
2. **Data Cleansing Engine:** Raw payloads are sanitized, restructured, and validated using advanced JavaScript array methods (`.map()`, `.reduce()`) to ensure absolute schema compliance before processing.
3. **Pattern Classification:** Clean data is processed through an automated classification gateway utilizing LLM function-calling to isolate high-risk pathogen and symptom clusters.
4. **Conditional Routing Loops:** Custom logic gates process exception-handling loops, ensuring that minor API dropouts never result in data or alert loss.
5. **Multi-Channel Dispatcher:** Upon pattern matching, the pipeline executes simultaneous HTTP actions to log records into core medical databases while firing instant alert triggers to system administrators.

## 📂 Project Structure
- `/src` : Standalone JavaScript payload formatting and routing scripts running inside n8n engine blocks.
- `disease_alert_workflow.json` : Production n8n blueprint blueprint JSON file.
