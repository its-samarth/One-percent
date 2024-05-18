import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';

const CompanyLogo = ({ symbol }) => {
  const [logoUrl, setLogoUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLogo = () => {
      fetch(`https://cloud.iexapis.com/stable/stock/${symbol}/logo?token=pk_6c918710ba114116a227559b2a1a8a9f`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          setLogoUrl(data.url);
          setLoading(false);
        })
        .catch(error => {
          setError(error.message);
          setLoading(false);
        });
    };

    fetchLogo();
  }, [symbol]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading logo...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {logoUrl ? (
        <Image source={{ uri: logoUrl }} style={styles.logo} />
      ) : (
        <Text>Logo not found</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  logo: {
    width: 70,
    height: 100,
    resizeMode:'contain'
  },
});

export default CompanyLogo;
