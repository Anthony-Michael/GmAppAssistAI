import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import supabase from '../../services/supabase';

/**
 * NPC Generator Screen Component
 * 
 * This component provides a simple interface for generating NPC details
 * using AI. It includes text inputs for the NPC role and trait, a button 
 * to trigger generation, and a text area to display the results.
 */
const NPCGeneratorScreen = () => {
  // State for the input fields
  const [npcRole, setNpcRole] = useState('');
  const [npcTrait, setNpcTrait] = useState('');
  
  // State for the generated result
  const [generatedNPC, setGeneratedNPC] = useState(null);
  
  // State for loading indicator
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Handle the generation of an NPC
   * This is a placeholder function that will be replaced with
   * actual Supabase/OpenAI API integration in the future
   */
  const handleGenerateNPC = () => {
    // Validate input
    if (!npcRole.trim()) {
      Alert.alert('Input Required', 'Please enter an NPC role');
      return;
    }

    // Set loading state
    setIsLoading(true);
    
    // Log the action (placeholder for actual API call)
    console.log('Generate NPC clicked with role:', npcRole, 'and trait:', npcTrait);
    
    // Simulate API call with timeout
    setTimeout(() => {
      // This is placeholder data - will be replaced with actual API response
      const mockNPCData = {
        name: 'Galen Thornwood',
        description: `A weathered ${npcRole.toLowerCase()} with deep-set eyes and calloused hands. ${
          npcTrait ? `Known for being ${npcTrait.toLowerCase()}.` : ''
        } Wears a faded blue cloak with silver embroidery.`,
        motivation: 'Seeks to restore honor to their family name after a scandal involving their younger sibling.',
        stats: {
          strength: 12,
          dexterity: 14,
          constitution: 13,
          intelligence: 15,
          wisdom: 16,
          charisma: 11
        }
      };
      
      // Update state with generated NPC
      setGeneratedNPC(mockNPCData);
      
      // Reset loading state
      setIsLoading(false);
    }, 1500); // Simulate 1.5 second API call
    
    /* 
    // Real implementation would look something like this:
    const generateNPC = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('generate-npc', {
          body: { role: npcRole, trait: npcTrait },
        });
        
        if (error) throw error;
        
        setGeneratedNPC(data);
      } catch (error) {
        Alert.alert('Error', error.message);
      } finally {
        setIsLoading(false);
      }
    };
    
    generateNPC();
    */
  };

  /**
   * Clear the form and results
   */
  const handleClear = () => {
    setNpcRole('');
    setNpcTrait('');
    setGeneratedNPC(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>NPC Generator</Text>
        
        {/* Input Section */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>NPC Role:</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., Blacksmith, Guard Captain, Wizard"
            value={npcRole}
            onChangeText={setNpcRole}
          />
          
          <Text style={styles.label}>Personality Trait (optional):</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., Suspicious, Friendly, Mysterious"
            value={npcTrait}
            onChangeText={setNpcTrait}
          />
          
          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.generateButton, isLoading && styles.disabledButton]}
              onPress={handleGenerateNPC}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <Text style={styles.buttonText}>Generate NPC</Text>
              )}
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.clearButton}
              onPress={handleClear}
              disabled={isLoading}
            >
              <Text style={styles.clearButtonText}>Clear</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Results Section */}
        {generatedNPC && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultTitle}>Generated NPC</Text>
            
            <View style={styles.npcCard}>
              <Text style={styles.npcName}>{generatedNPC.name}</Text>
              <Text style={styles.npcRole}>{npcRole}</Text>
              
              <View style={styles.separator} />
              
              <Text style={styles.sectionTitle}>Description</Text>
              <Text style={styles.npcDescription}>{generatedNPC.description}</Text>
              
              <Text style={styles.sectionTitle}>Motivation</Text>
              <Text style={styles.npcDescription}>{generatedNPC.motivation}</Text>
              
              <Text style={styles.sectionTitle}>Stats</Text>
              <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>STR</Text>
                  <Text style={styles.statValue}>{generatedNPC.stats.strength}</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>DEX</Text>
                  <Text style={styles.statValue}>{generatedNPC.stats.dexterity}</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>CON</Text>
                  <Text style={styles.statValue}>{generatedNPC.stats.constitution}</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>INT</Text>
                  <Text style={styles.statValue}>{generatedNPC.stats.intelligence}</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>WIS</Text>
                  <Text style={styles.statValue}>{generatedNPC.stats.wisdom}</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statLabel}>CHA</Text>
                  <Text style={styles.statValue}>{generatedNPC.stats.charisma}</Text>
                </View>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  inputContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  generateButton: {
    backgroundColor: '#4a6da7',
    borderRadius: 5,
    padding: 12,
    flex: 3,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledButton: {
    backgroundColor: '#a0b0c7',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  clearButton: {
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
    padding: 12,
    flex: 1,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  clearButtonText: {
    color: '#666',
    fontSize: 16,
  },
  resultContainer: {
    marginTop: 10,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  npcCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  npcName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  npcRole: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
    color: '#333',
  },
  npcDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: '#444',
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  statItem: {
    width: '30%',
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
    padding: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default NPCGeneratorScreen;
