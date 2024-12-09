'use client'
import LoginDialog from '../components/LoginDialog'
import { useAuth } from '../context/AuthContext'
import { useState } from 'react'

const withAuth = (WrappedComponent: React.ComponentType) => {
    const ProtectedComponent = (props: any) => {
        const { isAuthenticated } = useAuth()
        const [showLoginDialog, setShowLoginDialog] = useState(false)

        if (!isAuthenticated) {
            setShowLoginDialog(true)
            return (
                <>
                    {showLoginDialog && (
                        <div>
                            <LoginDialog />
                        </div>
                    )}
                </>
            )
        }

        return <WrappedComponent {...props} />
    }

    return ProtectedComponent
}

export default withAuth
