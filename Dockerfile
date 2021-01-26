FROM gradle:latest
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash -
RUN apt-get update && apt-get -y install nodejs unzip
# ENV VARIABLES
ENV SDK_URL="https://dl.google.com/android/repository/sdk-tools-linux-4333796.zip" \
    ANDROID_HOME="/usr/local/android-sdk" \
    ANDROID_VERSION=28 \
    ANDROID_BUILD_TOOLS_VERSION=28.0.3\
    GRADLE_VERSION=6.0.1
    
WORKDIR ${ANDROID_HOME}
# GET SDK MANAGER
RUN curl -sL -o android.zip ${SDK_URL} && unzip android.zip && rm android.zip
RUN yes | $ANDROID_HOME/tools/bin/sdkmanager --licenses
# ANDROID SDK AND PLATFORM
RUN $ANDROID_HOME/tools/bin/sdkmanager --update
RUN $ANDROID_HOME/tools/bin/sdkmanager "build-tools;${ANDROID_BUILD_TOOLS_VERSION}" \
    "platforms;android-${ANDROID_VERSION}" \
    "platform-tools"
# GRADLE
RUN curl -sL -o gradle.zip https://services.gradle.org/distributions/gradle-${GRADLE_VERSION}-bin.zip && unzip gradle.zip && rm gradle.zip

# ADD PATH TO BASHRC
RUN export PATH=$PATH:$ANDROID_HOME/emulator\
    && export PATH=$PATH:$ANDROID_HOME/tools\
    && export PATH=$PATH:$ANDROID_HOME/tools/bin\
    && export PATH=$PATH:/opt/gradle/gradle-${GRADLE_VERSION}/bin\
    && echo PATH=$PATH:$ANDROID_HOME/platform-tools>>/etc/bash.bashrc
# INSTALL YARN, REACT NATIVE CLI, CREATE-REACT-NATIVE-APP
RUN npm install -g add react-native-cli create-react-native-app 
# VOLUMES
VOLUME ["/app","/root/.gradle"]
# CHANGE WORKDIR
WORKDIR /app
