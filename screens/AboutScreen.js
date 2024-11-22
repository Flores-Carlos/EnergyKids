import React from 'react';
import { View, StyleSheet, Text, ScrollView, Image } from 'react-native';

export default function AboutScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Logo e Título */}
      <View style={styles.header}>
        <Image source={require('../assets/image/logo.png')} style={styles.logo} />
        <Text style={styles.title}>Sobre a EnergyKids</Text>
      </View>

      {/* Descrição */}
      <Text style={styles.description}>
        A EnergyKids é uma iniciativa educativa dedicada a ensinar crianças e jovens sobre a importância do uso consciente da energia. Nosso objetivo é promover a sustentabilidade através do aprendizado interativo e divertido.
      </Text>

      <Text style={styles.description}>
        Desde a nossa fundação, temos trabalhado para criar um futuro mais sustentável, incentivando práticas que economizem energia e reduzam o impacto ambiental. Acreditamos que, com pequenas ações, podemos fazer grandes mudanças no mundo.
      </Text>

      {/* Missão */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Nossa Missão</Text>
        <Text style={styles.sectionText}>
          Inspirar e educar as futuras gerações para usar a energia de forma sustentável, preservando o planeta para um amanhã melhor.
        </Text>
      </View>

      {/* Valores */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Nossos Valores</Text>
        <Text style={styles.sectionText}>
          - Sustentabilidade: Agir com responsabilidade ambiental.{'\n'}
          - Educação: Transformar o aprendizado em diversão.{'\n'}
          - Inclusão: Ensinar que todos podem fazer a diferença.
        </Text>
      </View>

      {/* Contribuidores */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contribuidores</Text>
        <Text style={styles.sectionText}>
          Kaique Gabriel Toschi RM: 551165{'\n'}
          Vinícius Ariel Monteiro Teixeira RM: 98839{'\n'}
          Carlos Gabriel de Freitas Flores Ferreira RM: 97528
        </Text>
        <Text style={styles.supportTitle}>Apoio:</Text>
        <Text style={styles.supportText}>FIAP - Faculdade de Informática e Administração Paulista</Text>
      </View>

      {/* Rodapé */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Juntos, salvando o planeta, um watt de cada vez!</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#555',
    textAlign: 'justify',
    marginBottom: 15,
    lineHeight: 22,
  },
  section: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 16,
    color: '#555',
    lineHeight: 22,
  },
  supportTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginTop: 20,
    textAlign: 'center',
  },
  supportText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginTop: 5,
    lineHeight: 22,
  },
  footer: {
    marginTop: 30,
    padding: 10,
    backgroundColor: '#E0E0E0',
    borderRadius: 10,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#757575',
    textAlign: 'center',
  },
});
