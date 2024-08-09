import { useState, useEffect } from 'react';
import { initConversation } from '../services/conversationService';


const useConversation = (sender, recipient, listing_id = null) => {
    
    const [conversation, setConversation] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);

    useEffect(() => {
        
        const checkAndFetchConversation = async () => {
            if (sender && recipient) {
                try {
                    
                    const response = await initConversation(sender, recipient);
                    
                    if (response.data) {
                        console.log("Conversation found or created:", response.data);
                        setConversation(response.data.id);
                        console.log("conversationId: ", response.data.id)
        
                    } else {
                        console.log("Error: No conversation data returned");
                    }
                } catch (error) {
                    console.error('Error fetching or creating conversation:', error);
                    setError(error);
                } finally {
                    setLoading(false);
                }
            }
        };

        checkAndFetchConversation();
    }, [sender, recipient, loading, error]);

    return { conversation, loading, error };
};

export default useConversation;
