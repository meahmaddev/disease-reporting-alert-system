/**
 * n8n JavaScript Code Node: Advanced Patient Data Normalization & Sanitization
 * 
 * Objective: Ingests unstructured raw HTTP webhook payloads, sanitizes inputs, 
 *            normalizes keys, handles exceptions, and prepares data for LLM analysis.
 */

// Loop through all incoming data items from the n8n trigger node
return items.map(item => {
    try {
        // Extract raw json data safely
        const rawData = item.json || {};
        
        // 1. Enforce strict type conversions and fallbacks (Data Sanitization)
        const patientName = String(rawData.patient_name || rawData.name || 'Anonymous').trim();
        const rawAge = parseInt(rawData.patient_age || rawData.age, 10);
        const patientAge = isNaN(rawAge) ? null : rawAge;
        
        // 2. Normalize symptoms array (handle strings or missing arrays safely)
        let symptoms = [];
        if (Array.isArray(rawData.symptoms)) {
            symptoms = rawData.symptoms.map(s => String(s).toLowerCase().trim());
        } else if (typeof rawData.symptoms === 'string') {
            symptoms = rawData.symptoms.split(',').map(s => s.toLowerCase().trim());
        }

        // 3. Extract nested metadata fields gracefully to avoid runtime "undefined" errors
        const trackingLocation = {
            city: String(rawData.location?.city || rawData.city || 'Unknown').trim(),
            region: String(rawData.location?.region || 'Default').toUpperCase()
        };

        // 4. Construct a validated, pristine schema tailored for LLM JSON classification
        const normalizedData = {
            metadata: {
                timestamp: new Date().toISOString(),
                ingestion_channel: String(rawData.source || 'webhook-gateway'),
                is_valid_payload: (symptoms.length > 0 && patientAge !== null)
            },
            patient_profile: {
                name: patientName,
                age: patientAge,
                location: trackingLocation
            },
            clinical_data: {
                reported_symptoms: symptoms,
                raw_report_snippet: String(rawData.notes || rawData.report || '').slice(0, 500)
            }
        };

        // Return the clean, restructured payload back to the n8n execution context
        return { json: normalizedData };

    } catch (error) {
        // Fail-safe: Capture runtime exceptions without breaking the entire n8n execution pipeline
        return {
            json: {
                error: true,
                exception_message: error.message,
                failed_at: new Date().toISOString(),
                raw_payload_fallback: item.json
            }
        };
    }
});
