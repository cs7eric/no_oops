pipeline {
    agent any

    environment {
        // 定义镜像名称
        IMAGE_NAME = "no-oops-front"
        // 定义容器名称
        CONTAINER_NAME = "no-oops-front"
        // 定义对外端口
        APP_PORT = "8088"
    }

    stages {
        stage('Prepare Environment') {
            steps {
                sh '''
                    #!/bin/bash
                    
                    echo "=== Configuring Git for Unstable Network ==="
                    
                    # Fix Git SSL/TLS issues
                    git config --global http.sslverify false
                    git config --global https.sslverify false
                    
                    # Increase buffer size for large transfers
                    git config --global http.postBuffer 524288000
                    
                    # Configure timeouts
                    git config --global http.lowSpeedLimit 0
                    git config --global http.lowSpeedTime 999999
                    
                    # Use HTTPS instead of Git protocol
                    git config --global url.https://.insteadOf git://
                    
                    echo "Git configuration completed"
                '''
            }
        }
        
        stage('Checkout') {
            steps {
                // 拉取 GitHub 代码，分支为 release
                checkout scmGit(branches: [[name: '*/release']], userRemoteConfigs: [[url: 'https://github.com/cs7eric/no_oops.git']])
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    echo '正在构建 Docker 镜像...'
                    // 使用 Build 号作为 Tag，方便回滚
                    sh "docker build -t ${IMAGE_NAME}:${BUILD_NUMBER} ."
                    sh "docker build -t ${IMAGE_NAME}:latest ."
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    echo '正在部署...'
                    // 1. 停止旧容器 (如果存在)
                    sh "docker ps -q --filter name=${CONTAINER_NAME} | xargs -r docker stop"
                    // 2. 删除旧容器 (如果存在)
                    sh "docker ps -aq --filter name=${CONTAINER_NAME} | xargs -r docker rm"
                    // 3. 运行新容器
                    sh "docker run -d -u root -p ${APP_PORT}:80 --name ${CONTAINER_NAME} ${IMAGE_NAME}:latest"
                }
            }
        }
    }
    
    post {
        always {
            // 清理工作空间，节省磁盘
            cleanWs()
        }
        success {
            echo '构建并部署成功！'
        }
        failure {
            echo '构建失败，请检查日志。'
        }
    }
}