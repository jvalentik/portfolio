import 'dart:html';
import 'dart:ui';

import 'package:flutter/material.dart';

class Home extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.indigo,
      appBar: AppBar(
        backgroundColor: Colors.indigo,
        title: Text(
          'Cloudis',
          style: TextStyle(fontFamily: 'Roboto'),
        ),
      ),
      body: Center(
        child: Image(
          image: AssetImage('images/logo_square.jpg'),
        ),
      ),
    );
  }
}
