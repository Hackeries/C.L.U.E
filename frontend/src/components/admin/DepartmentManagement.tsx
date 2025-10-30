import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Loader2, Search } from 'lucide-react'
import { Button } from '../ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import { getDepartments, createDepartment, updateDepartment, deleteDepartment } from '../../services/api'
import { toast } from 'sonner'
import type { Department } from '../../types'

export const DepartmentManagement = () => {
  const [departments, setDepartments] = useState<Department[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDept, setSelectedDept] = useState<Department | null>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  useEffect(() => {
    fetchDepartments()
  }, [])

  const fetchDepartments = async () => {
    try {
      const response = await getDepartments()
      setDepartments(response.data)
    } catch (error) {
      console.error('Error fetching departments:', error)
      toast.error('Failed to load departments')
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = {
      department_name: formData.get('department_name') as string,
      password: formData.get('password') as string,
      department_description: formData.get('department_description') as string,
    }

    try {
      await createDepartment(data)
      toast.success('Department created successfully')
      setIsCreateDialogOpen(false)
      fetchDepartments()
    } catch (error) {
      console.error('Error creating department:', error)
      toast.error('Failed to create department')
    }
  }

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!selectedDept) return

    const formData = new FormData(e.currentTarget)
    const data = {
      department_description: formData.get('department_description') as string,
      password: formData.get('password') as string,
    }

    try {
      await updateDepartment(selectedDept.department_name, data)
      toast.success('Department updated successfully')
      setIsEditDialogOpen(false)
      setSelectedDept(null)
      fetchDepartments()
    } catch (error) {
      console.error('Error updating department:', error)
      toast.error('Failed to update department')
    }
  }

  const handleDelete = async (dept: Department) => {
    if (!confirm(`Delete "${dept.department_name}"?`)) return

    try {
      await deleteDepartment(dept.department_name)
      toast.success('Department deleted successfully')
      fetchDepartments()
    } catch (error) {
      console.error('Error deleting department:', error)
      toast.error('Failed to delete department')
    }
  }

  const filteredDepts = departments.filter(dept =>
    dept.department_name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Department Management</CardTitle>
              <CardDescription>Manage departments and their details</CardDescription>
            </div>
            <Button onClick={() => setIsCreateDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Department
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search departments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Departments Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredDepts.map((dept) => (
          <Card key={dept.department_name}>
            <CardHeader>
              <CardTitle className="text-lg">{dept.department_name}</CardTitle>
              <CardDescription className="line-clamp-2">
                {dept.department_description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    setSelectedDept(dept)
                    setIsEditDialogOpen(true)
                  }}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(dept)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Create Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Department</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreate} className="space-y-4">
            <div>
              <Label htmlFor="department_name">Department Name</Label>
              <Input id="department_name" name="department_name" required />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" required />
            </div>
            <div>
              <Label htmlFor="department_description">Description</Label>
              <textarea
                id="department_description"
                name="department_description"
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                required
              />
            </div>
            <div className="flex gap-2">
              <Button type="submit" className="flex-1">Create</Button>
              <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Department</DialogTitle>
          </DialogHeader>
          {selectedDept && (
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <Label>Department Name</Label>
                <Input value={selectedDept.department_name} disabled />
              </div>
              <div>
                <Label htmlFor="edit_password">Password</Label>
                <Input 
                  id="edit_password" 
                  name="password" 
                  type="password" 
                  defaultValue={selectedDept.password}
                />
              </div>
              <div>
                <Label htmlFor="edit_description">Description</Label>
                <textarea
                  id="edit_description"
                  name="department_description"
                  defaultValue={selectedDept.department_description}
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  required
                />
              </div>
              <div className="flex gap-2">
                <Button type="submit" className="flex-1">Update</Button>
                <Button type="button" variant="outline" onClick={() => {
                  setIsEditDialogOpen(false)
                  setSelectedDept(null)
                }}>
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
